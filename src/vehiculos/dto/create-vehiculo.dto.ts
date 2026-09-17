import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateVehiculoDto {
  @ApiProperty({ example: '4589-KLP', description: 'Número de placa único' })
  @IsString({ message: 'La placa debe ser texto' })
  @IsNotEmpty({ message: 'La placa es obligatoria' })
  @MinLength(5, { message: 'La placa debe tener al menos 5 caracteres' })
  placa: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marca: string;

  @ApiProperty({ example: 'Corolla 2018' })
  @IsString()
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @ApiProperty({ example: 1, description: 'ID del cliente propietario' })
  @IsInt({ message: 'El clienteId debe ser entero' })
  @IsPositive({ message: 'El clienteId debe ser positivo' })
  clienteId: number;
}
