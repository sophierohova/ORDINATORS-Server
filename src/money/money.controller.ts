import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoneyService } from './money.service';
import { CreateMoneyDto, UpdateMoneyDto } from './dto/money.dto';

@Controller('money')
export class MoneyController {
  constructor(private readonly moneyService: MoneyService) {}

  @Post()
  create(@Body() dto: CreateMoneyDto) {
    return this.moneyService.create(dto);
  }

  @Get()
  findAll() {
    return this.moneyService.findAll();
  }

  @Get('by-ordinator/:id')
  findByOrdinator(@Param('id') id: string) {
    return this.moneyService.findByOrdinator(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMoneyDto,
  ) {
    return this.moneyService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneyService.remove(+id);
  }
}