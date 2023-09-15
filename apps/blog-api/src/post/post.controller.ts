import { AuthGuard } from './../auth/auth.guard';
import { FilterPost } from '@app/common';
import { Body, Controller, Get, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from '@app/common/Dtos/Post/UpdatePost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '@app/common/Dtos/Post/CreatePost.dto';
import { storeConfig } from '@app/common/config/store.config';
import { extname } from 'path';

@Controller('post')
@UsePipes(ValidationPipe)
export class PostController {

    constructor(
        private postService: PostService
    ) { }

    @Get()
    async listPost(@Query() query: FilterPost): Promise<any> {
        return await this.postService.all(query);
    }

    @Get(':id')
    async detailPost(@Param('id') id: number): Promise<any> {
        return await this.postService.show(id);
    }
    @UseGuards(AuthGuard)
    @Post()
    async createPost(@Body() post: CreatePostDto) { // add thumnail picture
        return await this.postService.create(post)
    }
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage: storeConfig('thumbnail-post'),
        fileFilter:(req,file,cb)=>{
            const ext = extname(file.originalname);
            const allowExt = ['.jpg','.jpeg','.png'];
            if (!allowExt.includes(ext)) {
                req.fileValidate = `Wrong extention type. Accept type are ${allowExt.toString()}`;
                cb(null,true);
            }else{
                const sizeFile = parseInt(req.headers['content-length']);
                if (sizeFile > 1024 * 1024 * 10) { // >10MB
                    req.fileValidate=`File must less than 10MB`;
                }else{
                    cb(null,true)
                }
            }
        }
    }))
    @Put(':id')
    async updatePost(@Body() post: UpdatePostDto, @Param('id') id: number, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log(file)
        console.log(req.user)

        if (req.fileValidate) {
            throw new BadRequestException(req.fileValidate);
        }
        if (!file) {
            throw new BadRequestException(`Thumnail image is required`);
        }
        // emit event post
        
        return await this.postService.update({
            ...post,
            thumbnail: file.destination + file.filename
        }, id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('img', {
        storage: storeConfig('content-upload'),
        fileFilter: (req, file, cb) => {
            const sizeFile = parseInt(req.headers['content-length']);
                if (sizeFile > 1024 * 1024 * 10) { // >10MB
                    req.fileValidate = `File must less than 10MB`;
                } else {
                    cb(null, true)
                }
        }
    }))
    uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log('upload');
        console.log(file);
        return file;
    }


}
