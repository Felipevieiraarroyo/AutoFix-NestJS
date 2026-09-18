import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrdenDto {
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  usuarioId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  vehiculoId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  mecanicoId?: number;
}