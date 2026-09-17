import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto.js';

@Injectable()
export class VehiculosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vehiculo.findMany({
      include: { cliente: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const vehiculo = await this.prisma.vehiculo.findUnique({
      where: { id },
      include: { cliente: true },
    });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return vehiculo;
  }

  async findByPlaca(placa: string) {
    const vehiculo = await this.prisma.vehiculo.findUnique({
      where: { placa: placa.toUpperCase().trim() },
      include: { cliente: true },
    });
    if (!vehiculo) {
      throw new NotFoundException(
        `No existe ningún vehículo registrado con la placa ${placa}`,
      );
    }
    return vehiculo;
  }

  async create(dto: CreateVehiculoDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: dto.clienteId },
    });
    if (!cliente) {
      throw new NotFoundException(
        `El cliente con ID ${dto.clienteId} no existe`,
      );
    }

    const placaLimpia = dto.placa.toUpperCase().trim();
    const existePlaca = await this.prisma.vehiculo.findUnique({
      where: { placa: placaLimpia },
    });
    if (existePlaca) {
      throw new ConflictException(
        `La placa ${placaLimpia} ya se encuentra registrada`,
      );
    }

    return this.prisma.vehiculo.create({
      data: {
        ...dto,
        placa: placaLimpia,
      },
    });
  }

  async update(id: number, dto: UpdateVehiculoDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.placa) {
      data.placa = dto.placa.toUpperCase().trim();
    }
    return this.prisma.vehiculo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.vehiculo.delete({ where: { id } });
  }
}
