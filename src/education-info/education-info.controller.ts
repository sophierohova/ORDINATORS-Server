import { Controller, Get, Post, Patch, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EducationInfoService } from './education-info.service';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';

@UseGuards(JwtAuthGuard)
@Controller('education-info')
export class EducationInfoController {
  constructor(private service: EducationInfoService) {}

  @Get('by-ordinator/:ordinatorsId')
  get(@Param('ordinatorsId') ordinatorsId: string) {
    return this.service.findByOrdinator(ordinatorsId);
  }

  @Post()
  create(@Body() dto: CreateEducationInfoDto) {
    return this.service.create(dto);
  }

   @Delete(':ordinatorsId')
    remove(@Param('ordinatorsId') ordinatorsId: string) {
      return this.service.remove(ordinatorsId);
   }

   @Patch(':ordinatorsId')
   update(
    @Param('ordinatorsId') ordinatorsId: string,
    @Body() dto: UpdateEducationInfoDto,) {
       return this.service.update(ordinatorsId, dto);
   }
}