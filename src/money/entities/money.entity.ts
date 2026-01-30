import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('money')
export class Money {
  @PrimaryGeneratedColumn()
  money_id: number;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @Column({ type: 'text' })
  ordinators_id: string;
}
