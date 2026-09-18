import { PartialType } from '@nestjs/mapped-types';
import { CreateRepuestoDto } from './create-repuesto.dto.js';

export class UpdateRepuestoDto extends PartialType(CreateRepuestoDto) {}