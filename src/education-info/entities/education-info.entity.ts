import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('education_info')
export class EducationInfo {
  @PrimaryGeneratedColumn()
  education_id: number;

  @Column({ type: 'text' })
  ordinators_id: string;

  @Column({ type: 'date', nullable: true })
  date_enrollment: string;

  @Column({ type: 'text', nullable: true })
  number_enrollment: string;

  @Column({ type: 'date', nullable: true })
  date_expulsion: string;

  @Column({ type: 'text', nullable: true })
  number_expulsion: string;

  @Column({ type: 'text', nullable: true })
  reason_expulsion: string;
}
