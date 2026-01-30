import { IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateMoneyDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsString()
  ordinators_id: string;
}

export class UpdateMoneyDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}