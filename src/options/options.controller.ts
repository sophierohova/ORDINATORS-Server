import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
    ParseEnumPipe,
  } from '@nestjs/common';
  import { OptionsService } from './options.service';
  import { OptionsDto, AddOptionDto } from './dto/options.dto';
  import { LogsService } from '../logs/logs.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('options')
  @UseGuards(JwtAuthGuard)
  export class OptionsController {
    constructor(
      private readonly optionsService: OptionsService,
      private readonly logsService: LogsService,
    ) {}
  
    @Get()
    async findAll(@Req() req) {
      const result = await this.optionsService.findAll();
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'VIEW_OPTIONS',
        description: `Просмотр списка опций`,
        ipAddress: req.ip,
      });
      
      return result;
    }
  
    @Post()
    @HttpCode(HttpStatus.OK)
    async saveAll(@Body() optionsDto: OptionsDto, @Req() req) {
      const result = await this.optionsService.saveAll(optionsDto);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'UPDATE_OPTIONS',
        description: `Сохранение всех опций`,
        ipAddress: req.ip,
      });
      
      return { message: 'Опции сохранены', data: result };
    }
  
    @Post('reset')
    async resetToDefault(@Req() req) {
      const result = await this.optionsService.resetToDefault();
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'RESET_OPTIONS',
        description: `Сброс опций к значениям по умолчанию`,
        ipAddress: req.ip,
      });
      
      return { message: 'Опции сброшены к значениям по умолчанию', data: result };
    }
  
    @Post(':field/add')
    async addOption(
      @Param('field') field: string,
      @Body() addOptionDto: AddOptionDto,
      @Req() req,
    ) {
      const result = await this.optionsService.addOption(field, addOptionDto.value);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'ADD_OPTION_VALUE',
        description: `Добавление значения в ${field}: ${addOptionDto.value}`,
        targetInfo: `Поле: ${field}, Значение: ${addOptionDto.value}`,
        ipAddress: req.ip,
      });
      
      return { 
        message: 'Значение добавлено', 
        field,
        value: addOptionDto.value,
        data: result 
      };
    }
  
    @Delete(':field/:value')
    async deleteOption(
      @Param('field') field: string,
      @Param('value') value: string,
      @Req() req,
    ) {
      const decodedValue = decodeURIComponent(value);
      const result = await this.optionsService.deleteOption(field, decodedValue);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'DELETE_OPTION_VALUE',
        description: `Удаление значения из ${field}: ${decodedValue}`,
        targetInfo: `Поле: ${field}, Значение: ${decodedValue}`,
        ipAddress: req.ip,
      });
      
      return { 
        message: 'Значение удалено', 
        field,
        value: decodedValue,
        data: result 
      };
    }
  }