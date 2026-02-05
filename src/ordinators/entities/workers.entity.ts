import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('workers')
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fio: string;

  @Column()
  position: string;

  @Column()
  department: string;

  // One-to-Many с ординаторами (если нужно)
  @OneToMany(() => Ordinator, ordinator => ordinator.supervisorId)
  ordinators: Ordinator[];
}