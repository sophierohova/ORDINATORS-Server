import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Money } from './entities/money.entity';
import { CreateMoneyDto, UpdateMoneyDto } from './dto/money.dto';

@Injectable()
export class MoneyService {
  constructor(
    @InjectRepository(Money)
    private readonly moneyRepository: Repository<Money>,
  ) {}

  create(dto: CreateMoneyDto) {
    const money = this.moneyRepository.create(dto);
    return this.moneyRepository.save(money);
  }

  findAll() {
    return this.moneyRepository.find();
  }

  findByOrdinator(ordinators_id: string) {
    return this.moneyRepository.find({
      where: { ordinators_id },
    });
  }

  async update(id: number, dto: UpdateMoneyDto) {
    await this.moneyRepository.update(id, dto);
    return this.moneyRepository.findOne({
      where: { money_id: id },
    });
  }

  async remove(id: number) {
    return this.moneyRepository.delete(id);
  }
}