import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from './entities/vacation.entity';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation)
    private readonly vacationRepo: Repository<Vacation>,
  ) {}

  findAll() {
    return this.vacationRepo.find();
  }

  findByOrdinator(ordinators_id: string) {
    return this.vacationRepo.find({
      where: { ordinators_id },
    });
  }

  create(dto: CreateVacationDto) {
    const vacation = this.vacationRepo.create(dto);
    return this.vacationRepo.save(vacation);
  }

  async update(id: number, dto: UpdateVacationDto) {
    await this.vacationRepo.update({ vacation_id: id }, dto);
    return this.vacationRepo.findOneBy({ vacation_id: id });
  }

  async remove(id: number) {
    return await this.vacationRepo.delete({ vacation_id: id });
  }
}