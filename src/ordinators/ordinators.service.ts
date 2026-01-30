import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordinator } from './entities/ordinator.entity';
import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

@Injectable()
export class OrdinatorsService {
  constructor(
    @InjectRepository(Ordinator)
    private readonly ordinatorRepo: Repository<Ordinator>,
  ) {}

  findAll() {
    return this.ordinatorRepo.find();
  }
  
  create(dto: CreateOrdinatorDto) {
  const ordinator = this.ordinatorRepo.create(dto);
    return this.ordinatorRepo.save(ordinator);
 }

  findOne(id: string) {
    return this.ordinatorRepo.findOneBy({ id });
  }

  async remove(id: string) {
    await this.ordinatorRepo.delete({ id });
    return { deleted: true };
  }

  async update(id: string, dto: UpdateOrdinatorDto) {
    await this.ordinatorRepo.update({ id }, dto);
    return this.findOne(id);
  }  
  
  async findAllForTable() {
  return this.ordinatorRepo
    .createQueryBuilder('o')
    .leftJoin('education_info', 'e', 'e.ordinators_id = o.id')
    .leftJoin('university', 'u', 'u.ordinators_id = o.id')
    .leftJoin('vacation', 'v', 'v.ordinators_id = o.id')
    .select([
      'o.id AS id',
      "concat(o.lastname_ru, ' ', o.firstname_ru, ' ', coalesce(o.patronymic_ru, '')) AS fio",
      "concat(o.lastname_en, ' ', o.firstname_en) AS fio_en",
      'EXTRACT(YEAR FROM o.birth_date) AS birth_year',
      'o.gender AS gender',
      'o.country AS country',
      'e.date_enrollment AS date_enrollment',
      'e.date_expulsion AS date_expulsion',
      'e.reason_expulsion AS reason_expulsion',
      'u.name AS university',
      'u.education_form AS education_form',
      'o.mobile AS mobile',
      'o.login AS login',
      'o.medicalcertificate AS medicalcertificate',
      'o.RIVShcertificate AS rivshcertificate',
    ])
    .getRawMany();
}

}
