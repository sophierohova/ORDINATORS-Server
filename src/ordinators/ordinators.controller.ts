import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseIntPipe,
  } from '@nestjs/common';
  import { OrdinatorsService } from './ordinators.service';
  import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
  import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

  @Controller('ordinators')
  export class OrdinatorsController {
    constructor(private readonly ordinatorsService: OrdinatorsService) {}
  
    @Post()
    create(@Body() createOrdinatorDto: CreateOrdinatorDto) {
      return this.ordinatorsService.create(createOrdinatorDto);
    }
  
    @Get()
    findAll(@Query() filters: any) {
      return this.ordinatorsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.ordinatorsService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateOrdinatorDto: UpdateOrdinatorDto,
    ) {
      return this.ordinatorsService.update(id, updateOrdinatorDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.ordinatorsService.remove(id);
    }
  }