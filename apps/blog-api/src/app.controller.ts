
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //test microservice
  @Get('post-test')
  async testPostModuleService() {
    const testData = "Data test";
    return await this.appService.handleTestMicroPostService(testData);
  }

  

}
