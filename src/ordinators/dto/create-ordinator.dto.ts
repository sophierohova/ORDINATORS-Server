import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrdinatorDto {
  @IsString()
  @IsOptional()
  fio?: string;

  @IsString()
  @IsOptional()
  fioEn?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthYear?: Date;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  enrollmentDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dismissalDate?: Date;

  @IsString()
  @IsOptional()
  dismissalReason?: string;

  @IsString()
  @IsOptional()
  socialLeave?: string;

  @IsString()
  @IsOptional()
  socialLeaveDuration?: string;

  @IsString()
  @IsOptional()
  mobilePhone?: string;

  @IsString()
  @IsOptional()
  identityDocument?: string;

  @IsString()
  @IsOptional()
  documentNumber?: string;

  @IsString()
  @IsOptional()
  residenceAddress?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  registrationExpiry?: Date;

  @IsString()
  @IsOptional()
  enrollmentOrder?: string;

  @IsString()
  @IsOptional()
  dismissalOrder?: string;

  @IsString()
  @IsOptional()
  contractInfo?: string;

  @IsString()
  @IsOptional()
  medicalCertificate?: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  supervisorId?: number;

  @IsString()
  @IsOptional()
  rivshCertificate?: string;

  @IsString()
  @IsOptional()
  entryByInvitation?: string;

  @IsString()
  @IsOptional()
  distributionInfo?: string;

  @IsString()
  @IsOptional()
  universityName?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  graduationYear?: Date;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  specialtyProfile?: string;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsString()
  @IsOptional()
  preparationForm?: string;

  @IsString()
  @IsOptional()
  scores?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  allowanceStartDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  allowanceEndDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  sessionStart?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  sessionEnd?: Date;
}