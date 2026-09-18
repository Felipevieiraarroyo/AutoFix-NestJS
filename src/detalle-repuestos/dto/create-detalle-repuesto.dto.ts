import {
  IsInt,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateDetalleRepuestoDto {
  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @IsInt()
  @IsPositive()
  ordenId: number;

  @IsInt()
  @IsPositive()
  repuestoId: number;
}