import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('education_info')
export class EducationInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  additional_info: string;

  // Обратная связь One-to-One
  @OneToOne(() => Ordinator, ordinator => ordinator.educationInfo)
  ordinator: Ordinator;
}