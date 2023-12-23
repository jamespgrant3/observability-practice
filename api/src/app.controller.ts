import { Controller, Get } from '@nestjs/common';
import { AppService, User } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }
}
