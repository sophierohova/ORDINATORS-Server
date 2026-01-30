import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('university')
export class University {
  @PrimaryGeneratedColumn()
  university_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date' })
  graduation_year: string;

  @Column({ type: 'text' })
  department: string;

  @Column({ type: 'text' })
  profile: string;

  @Column({ type: 'text' })
  speciality: string;

  @Column({ type: 'text' })
  education_form: string;

  @Column({ type: 'text' })
  ordinators_id: string;
}