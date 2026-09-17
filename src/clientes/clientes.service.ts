import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cliente.findMany({
      include: { vehiculos: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { vehiculos: true },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async create(dto: CreateClienteDto) {
    if (dto.email) {
      const existe = await this.prisma.cliente.findUnique({
        where: { email: dto.email },
      });
      if (existe) {
        throw new ConflictException(
          'El correo ya está asignado a otro cliente',
        );
      }
    }
    return this.prisma.cliente.create({ data: dto });
  }

  async update(id: number, dto: UpdateClienteDto) {
    await this.findOne(id);
    if (dto.email) {
      const existe = await this.prisma.cliente.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (existe) {
        throw new ConflictException(
          'El correo ya está en uso por otro cliente',
        );
      }
    }
    return this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    if (cliente.vehiculos && cliente.vehiculos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar un cliente con vehículos asociados',
      );
    }
    return this.prisma.cliente.delete({ where: { id } });
  }
}
