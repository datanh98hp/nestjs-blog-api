import { Category } from './Category.entity';
import { Comment } from './Comment.entity';
import { User } from './User.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    subtitle: string;
    @Column()
    slug: string;
    @Column({type:'longtext'})
    content:string;
    @Column({nullable:true})
    thumbnail:string;
    @ManyToOne(() => Category, (category) => category.posts)
    category: Category
    @ManyToOne(()=>User,(user)=>user.posts)
    author:User
    @OneToMany(type => Comment, comment => comment.post)
    comments:Comment[]
    @CreateDateColumn({nullable:true})
    created_at:Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}