import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdinatorDto } from './create-ordinator.dto';

export class UpdateOrdinatorDto extends PartialType(CreateOrdinatorDto) {}