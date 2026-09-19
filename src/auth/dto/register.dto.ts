import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Usamos el mismo enum que definieron en el schema
export enum Role {
  MECANICO = 'MECANICO',
  RECEPCIONISTA = 'RECEPCIONISTA',
  DUENO = 'DUENO',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}