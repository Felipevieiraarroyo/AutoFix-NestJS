import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

type CrearOrdenData = {
  descripcion: string;
  usuarioId: number;
  vehiculoId: number;
  mecanicoId?: number;
};

@Injectable()
export class OrdenesService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(data: CrearOrdenData) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        id: data.usuarioId,
      },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario indicado no existe');
    }

    if (usuario.role !== 'RECEPCIONISTA') {
      throw new BadRequestException(
        'El usuario que crea la orden debe ser RECEPCIONISTA',
      );
    }

    const vehiculo = await this.prisma.vehiculos.findUnique({
      where: {
        id: data.vehiculoId,
      },
    });

    if (!vehiculo) {
      throw new NotFoundException('El vehículo indicado no existe');
    }

    if (data.mecanicoId !== undefined) {
      const mecanico = await this.prisma.usuarios.findUnique({
        where: {
          id: data.mecanicoId,
        },
      });

      if (!mecanico) {
        throw new NotFoundException('El mecánico indicado no existe');
      }

      if (mecanico.role !== 'MECANICO') {
        throw new BadRequestException(
          'El usuario asignado debe tener rol MECANICO',
        );
      }
    }

    return this.prisma.ordenes.create({
      data: {
        descripcion: data.descripcion,
        usuarioId: data.usuarioId,
        vehiculoId: data.vehiculoId,
        mecanicoId: data.mecanicoId,
      },
    });
  }
}