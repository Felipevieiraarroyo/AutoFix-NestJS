import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

type CrearClienteData = {
  nombre: string;
  telefono: string;
  email: string;
};

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(data: CrearClienteData) {
    const clienteExistente = await this.prisma.clientes.findUnique({
      where: {
        email: data.email,
      },
    });

    if (clienteExistente) {
      throw new ConflictException(
        'Ya existe un cliente registrado con ese email',
      );
    }

    return this.prisma.clientes.create({
      data: {
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email,
      },
    });
  }
}