import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto.js';

@Injectable()
export class VehiculosService {  // <-- Asegúrate de que tenga "export" aquí
  constructor(private readonly prisma: PrismaService) {}

  create(createVehiculoDto: CreateVehiculoDto) {
    return this.prisma.vehiculos.create({
      data: createVehiculoDto,
      include: {
        cliente: true,
      },
    });
  }

  findAll() {
    return this.prisma.vehiculos.findMany({
      include: {
        cliente: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.vehiculos.findUniqueOrThrow({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    return this.prisma.vehiculos.update({
      where: { id },
      data: updateVehiculoDto,
      include: {
        cliente: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.vehiculos.delete({
      where: { id },
    });
  }
}