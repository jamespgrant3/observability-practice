import { Controller, Get } from '@nestjs/common';
import { AppService, UserResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): UserResponse {
    return this.appService.getUsers();
  }
}
