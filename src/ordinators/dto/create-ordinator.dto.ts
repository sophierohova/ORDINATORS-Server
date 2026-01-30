import {
    IsString,
    IsEmail,
    IsDateString,
    IsIn,
    IsOptional,
} from 'class-validator';
  
export class CreateOrdinatorDto {
    @IsString()
    id: string;

    @IsString()
    lastname_ru: string;

    @IsString()
    firstname_ru: string;

    @IsOptional()
    @IsString()
    patronymic_ru?: string;

    @IsString()
    lastname_en: string;

    @IsString()
    firstname_en: string;

    @IsOptional()
    @IsString()
    patronymic_en?: string;

    @IsString()
    country: string;

    @IsDateString()
    birth_date: string;

    @IsString()
    gender: string;

    @IsString()
    mobile: string;

    @IsEmail()
    email: string;

    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsIn(['Y', 'N'])
    medicalcertificate: 'Y' | 'N';

    @IsIn(['Y', 'N'])
    RIVShcertificate: 'Y' | 'N';

    @IsString()
    doc_type: string;

    @IsIn(['Y', 'N'])
    invite: 'Y' | 'N';

    @IsString()
    agreement: string;

    @IsString()
    distribution: string;

    @IsString()
    teacher: string;

    @IsString()
    living_place: string;

    @IsDateString()
    registration_deadline: string;
}
  