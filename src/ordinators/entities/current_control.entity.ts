import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('current_control')
export class CurrentControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  scores: string;

  // Обратная связь One-to-One
  @OneToOne(() => Ordinator, ordinator => ordinator.currentControl)
  ordinator: Ordinator;
}