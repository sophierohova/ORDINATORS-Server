import { IsString } from 'class-validator';

export class CreateVacationDto {
  @IsString()
  cause: string;

  @IsString()
  duration: string;

  @IsString()
  ordinators_id: string;
}