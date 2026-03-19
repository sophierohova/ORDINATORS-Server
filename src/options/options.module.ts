import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [LogsModule],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}