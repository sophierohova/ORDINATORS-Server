import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ordinators')
export class Ordinator {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  lastname_ru: string;

  @Column({ type: 'varchar', length: 100 })
  firstname_ru: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  patronymic_ru?: string;

  @Column({ type: 'varchar', length: 100 })
  lastname_en: string;

  @Column({ type: 'varchar', length: 100 })
  firstname_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  patronymic_en?: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 20 })
  mobile: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'char', length: 1 })
  medicalcertificate: 'Y' | 'N';

  @Column({ type: 'char', length: 1 })
  RIVShcertificate: 'Y' | 'N';

  @Column({ type: 'varchar', length: 50 })
  doc_type: string;

  @Column({ type: 'char', length: 1 })
  invite: 'Y' | 'N';

  @Column({ type: 'varchar', length: 50 })
  agreement: string;

  @Column({ type: 'varchar', length: 50 })
  distribution: string;

  @Column({ type: 'varchar', length: 50 })
  teacher: string;

  @Column({ type: 'varchar', length: 255 })
  living_place: string;

  @Column({ type: 'date' })
  registration_deadline: string;
}
