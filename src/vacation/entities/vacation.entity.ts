import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacation')
export class Vacation {
  @PrimaryGeneratedColumn()
  vacation_id: number;

  @Column({ type: 'text' })
  cause: string;

  @Column({ type: 'text' })
  duration: string;

  @Column({ type: 'text' })
  ordinators_id: string;
}
