import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
require('newrelic');

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
