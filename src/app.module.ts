import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeExceptionFilter } from './common/filters/sequelize-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: SequelizeExceptionFilter
  }],
})
export class AppModule {}
