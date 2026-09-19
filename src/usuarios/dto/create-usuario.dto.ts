import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum Role {
  MECANICO = 'MECANICO',
  RECEPCIONISTA = 'RECEPCIONISTA',
  DUENO = 'DUENO',
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password_hash: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}