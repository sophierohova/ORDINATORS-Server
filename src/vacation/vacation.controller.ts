import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Controller('vacation')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Get()
  findAll() {
    return this.vacationService.findAll();
  }

  @Get('by-ordinator/:id')
  findByOrdinator(@Param('id') id: string) {
    return this.vacationService.findByOrdinator(id);
  }

  @Post()
  create(@Body() dto: CreateVacationDto) {
    return this.vacationService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateVacationDto,
  ) {
    return this.vacationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vacationService.remove(id);
  }
}