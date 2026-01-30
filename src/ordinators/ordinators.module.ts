import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordinator } from './entities/ordinator.entity';
import { OrdinatorsService } from './ordinators.service';
import { OrdinatorsController } from './ordinators.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ordinator])],
  controllers: [OrdinatorsController],
  providers: [OrdinatorsService],
})
export class OrdinatorsModule {}
