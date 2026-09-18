import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

type CrearVehiculoData = {
  placa: string;
  marca: string;
  modelo: string;
  clienteId: number;
};

@Injectable()
export class VehiculosService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(data: CrearVehiculoData) {
    const cliente = await this.prisma.clientes.findUnique({
      where: {
        id: data.clienteId,
      },
    });

    if (!cliente) {
      throw new NotFoundException('El cliente indicado no existe');
    }

    const vehiculoExistente = await this.prisma.vehiculos.findUnique({
      where: {
        placa: data.placa,
      },
    });

    if (vehiculoExistente) {
      throw new ConflictException(
        'Ya existe un vehículo registrado con esa placa',
      );
    }

    return this.prisma.vehiculos.create({
      data: {
        placa: data.placa,
        marca: data.marca,
        modelo: data.modelo,
        clienteId: data.clienteId,
      },
    });
  }
}