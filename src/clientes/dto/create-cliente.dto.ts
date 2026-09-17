import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    example: 'Juan Carlos Perez',
    description: 'Nombre completo del cliente',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @ApiPropertyOptional({
    example: '77234567',
    description: 'Teléfono de contacto',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  telefono?: string;

  @ApiPropertyOptional({ example: 'cliente@gmail.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Formato de correo inválido' })
  email?: string;
}
