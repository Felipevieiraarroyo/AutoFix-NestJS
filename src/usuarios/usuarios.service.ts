import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js'; 
import { CreateUsuarioDto } from './dto/create-usuario.dto.js'; 
@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(data: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuarios.findUnique({
      where: { email: data.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    return this.prisma.usuarios.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        password_hash: data.password_hash,
        role: data.role,
      },
    });
  }

  async findAll() {
    return this.prisma.usuarios.findMany();
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }
}