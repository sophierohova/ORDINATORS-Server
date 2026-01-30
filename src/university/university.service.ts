import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepo: Repository<University>,
  ) {}

  create(dto: CreateUniversityDto) {
    const entity = this.universityRepo.create(dto);
    return this.universityRepo.save(entity);
  }

  findByOrdinatorId(ordinators_id: string) {
    return this.universityRepo.find({
      where: { ordinators_id },
    });
  }

  async update(id: number, dto: UpdateUniversityDto) {
    await this.universityRepo.update({ university_id: id }, dto);
    return this.universityRepo.findOneBy({ university_id: id });
  }

  remove(id: number) {
    return this.universityRepo.delete({ university_id: id });
  }
}