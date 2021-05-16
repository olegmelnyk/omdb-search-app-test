import { Controller, Get, Post, Req, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('authenticate')
  authenticate(@Req() request: Request): string {
    const { login, password } = request.body as any;

    return this.appService.authenticate({ login, password });
  }

  @Get('search')
  async search(@Req() request: Request): Promise<any> {
    const query = request.query as any;
    const key = request.headers['authorization'];

    if(!key || !this.appService.authrorize(key)) {
      throw new ForbiddenException();
    }

    return await this.appService.search(query);
  }
}
