import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Injectable()
export class RepuestosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRepuestoDto: CreateRepuestoDto) {
    return this.prisma.repuestos.create({
      data: createRepuestoDto,
    });
  }

  async findAll() {
    return this.prisma.repuestos.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const repuesto = await this.prisma.repuestos.findUnique({
      where: { id },
    });

    if (!repuesto) {
      throw new NotFoundException(
        `Repuesto con ID ${id} no encontrado`,
      );
    }

    return repuesto;
  }

  async update(
    id: number,
    updateRepuestoDto: UpdateRepuestoDto,
  ) {
    await this.findOne(id);

    return this.prisma.repuestos.update({
      where: { id },
      data: updateRepuestoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.repuestos.delete({
      where: { id },
    });
  }
}