import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('money')
export class Money {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'allowance_start_date', type: 'date', nullable: true })
  allowanceStartDate: Date;

  @Column({ name: 'allowance_end_date', type: 'date', nullable: true })
  allowanceEndDate: Date;

  // Обратная связь One-to-One
  @OneToOne(() => Ordinator, ordinator => ordinator.money)
  ordinator: Ordinator;
}