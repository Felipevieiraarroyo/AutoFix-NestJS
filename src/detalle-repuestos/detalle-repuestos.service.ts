import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDetalleRepuestoDto } from './dto/create-detalle-repuesto.dto.js';
import { UpdateDetalleRepuestoDto } from './dto/update-detalle-repuesto.dto.js';

@Injectable()
export class DetalleRepuestosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDetalleRepuestoDto: CreateDetalleRepuestoDto,
  ) {
    const { ordenId, repuestoId } = createDetalleRepuestoDto;

    const orden = await this.prisma.ordenes.findUnique({
      where: { id: ordenId },
    });

    if (!orden) {
      throw new NotFoundException(
        `Orden con ID ${ordenId} no encontrada`,
      );
    }

    const repuesto = await this.prisma.repuestos.findUnique({
      where: { id: repuestoId },
    });

    if (!repuesto) {
      throw new NotFoundException(
        `Repuesto con ID ${repuestoId} no encontrado`,
      );
    }

    return this.prisma.detalle_repuestos_orden.create({
      data: createDetalleRepuestoDto,
    });
  }

  async findAll() {
    return this.prisma.detalle_repuestos_orden.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const detalle =
      await this.prisma.detalle_repuestos_orden.findUnique({
        where: { id },
      });

    if (!detalle) {
      throw new NotFoundException(
        `Detalle de repuesto con ID ${id} no encontrado`,
      );
    }

    return detalle;
  }

  async update(
    id: number,
    updateDetalleRepuestoDto: UpdateDetalleRepuestoDto,
  ) {
    await this.findOne(id);

    const { ordenId, repuestoId } = updateDetalleRepuestoDto;

    if (ordenId !== undefined) {
      const orden = await this.prisma.ordenes.findUnique({
        where: { id: ordenId },
      });

      if (!orden) {
        throw new NotFoundException(
          `Orden con ID ${ordenId} no encontrada`,
        );
      }
    }

    if (repuestoId !== undefined) {
      const repuesto = await this.prisma.repuestos.findUnique({
        where: { id: repuestoId },
      });

      if (!repuesto) {
        throw new NotFoundException(
          `Repuesto con ID ${repuestoId} no encontrado`,
        );
      }
    }

    return this.prisma.detalle_repuestos_orden.update({
      where: { id },
      data: updateDetalleRepuestoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.detalle_repuestos_orden.delete({
      where: { id },
    });
  }
}