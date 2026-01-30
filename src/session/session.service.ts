import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  create(dto: CreateSessionDto) {
    const session = this.sessionRepository.create(dto);
    return this.sessionRepository.save(session);
  }

  findAll() {
    return this.sessionRepository.find();
  }

  findByOrdinator(ordinators_id: string) {
    return this.sessionRepository.find({
      where: { ordinators_id },
    });
  }

  async update(id: number, dto: UpdateSessionDto) {
    await this.sessionRepository.update(id, dto);
    return this.sessionRepository.findOne({
      where: { session_id: id },
    });
  }

  async remove(id: number) {
    return this.sessionRepository.delete(id);
  }
}