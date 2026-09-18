import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRepuestoDto } from './create-detalle-repuesto.dto.js';

export class UpdateDetalleRepuestoDto extends PartialType(
  CreateDetalleRepuestoDto,
) {}