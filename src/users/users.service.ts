import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  async findOneByLogin(login: string): Promise<Worker | null> {
    return this.workersRepository.findOne({ where: { login } });
  }

  async findOneById(id: number): Promise<Worker | null> {
    return this.workersRepository.findOne({ where: { id } });
  }

  async createWorker(
    fio: string,
    login: string,
    password: string,
    role: string = 'user',
  ): Promise<Worker> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const worker = this.workersRepository.create({
      fio,
      login,
      password: hashedPassword,
      role,
    });

    return this.workersRepository.save(worker);
  }

  async validateUser(login: string, password: string): Promise<Worker | null> {
    const worker = await this.findOneByLogin(login);
    
    if (worker && await bcrypt.compare(password, worker.password)) {
      const { password, ...result } = worker;
      return result as Worker;
    }
    
    return null;
  }

  // ДОБАВЛЯЕМ ЭТИ МЕТОДЫ:

  // Получить всех пользователей (без паролей)
  async findAll(): Promise<any[]> {
    const workers = await this.workersRepository.find({
      select: ['id', 'fio', 'login', 'role'],
      order: { id: 'ASC' }
    });
    return workers;
  }

  // Обновить пользователя
  async update(id: number, updateData: any): Promise<Worker> {
    const worker = await this.workersRepository.findOne({ where: { id } });
    
    if (!worker) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Если обновляется пароль - хешируем его
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Обновляем только разрешенные поля
    if (updateData.fio) worker.fio = updateData.fio;
    if (updateData.login) worker.login = updateData.login;
    if (updateData.role) worker.role = updateData.role;
    if (updateData.password) worker.password = updateData.password;
    
    return this.workersRepository.save(worker);
  }

  // Удалить пользователя
  async remove(id: number): Promise<void> {
    const worker = await this.workersRepository.findOne({ where: { id } });
    
    if (!worker) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.workersRepository.remove(worker);
  }
}