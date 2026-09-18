import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  placa!: string;

  @IsString()
  @IsNotEmpty()
  marca!: string;

  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  clienteId!: number;
}