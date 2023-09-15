import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('POST_SERVICE') private readonly client: ClientProxy,
    @Inject(CONTEXT) private ctx: any
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async handleTestMicroPostService(data) {

    await this.client.emit('test', data);
    const result = this.client.send('test', data); // get data from service post
    return result;
  }

}
