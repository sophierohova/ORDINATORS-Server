import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationInfo } from './entities/education-info.entity';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';

@Injectable()
export class EducationInfoService {
  constructor(
    @InjectRepository(EducationInfo)
    private repo: Repository<EducationInfo>,
  ) {}

  findByOrdinator(ordinators_id: string) {
    return this.repo.findOne({ where: { ordinators_id } });
  }

  async create(dto: CreateEducationInfoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

 async remove(ordinators_id: string) {
    await this.repo.delete({ ordinators_id });
    return { deleted: true };
  }
  
  async update(ordinators_id: string, dto: UpdateEducationInfoDto) {
    await this.repo.update({ ordinators_id }, dto);
    return this.findByOrdinator(ordinators_id);
  }
}