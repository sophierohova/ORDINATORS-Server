import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; 
import { Worker } from './entities/worker.entity';
import { LogsModule } from '../logs/logs.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Worker]),
    LogsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController], 
  exports: [UsersService],
})
export class UsersModule {}