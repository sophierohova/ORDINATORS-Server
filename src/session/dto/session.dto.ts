import { IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsString()
  ordinators_id: string;
}

export class UpdateSessionDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}