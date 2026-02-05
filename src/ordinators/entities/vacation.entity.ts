import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('vacation')
export class Vacation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vacation_start', type: 'date', nullable: true })
  vacationStart: Date;

  @Column({ name: 'vacation_end', type: 'date', nullable: true })
  vacationEnd: Date;

  // Обратная связь One-to-One
  @OneToOne(() => Ordinator, ordinator => ordinator.vacation)
  ordinator: Ordinator;
}