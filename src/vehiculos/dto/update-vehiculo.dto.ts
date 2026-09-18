import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoDto } from './create-vehiculo.dto.js'

export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {}