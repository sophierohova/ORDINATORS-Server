import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateEducationInfoDto {
  @IsString()
  ordinators_id: string;

  @IsDateString()
  date_enrollment: string;

  @IsString()
  number_enrollment: string;

  @IsOptional()
  @IsDateString()
  date_expulsion?: string;

  @IsOptional()
  @IsString()
  number_expulsion?: string;

  @IsOptional()
  @IsString()
  reason_expulsion?: string;
}
