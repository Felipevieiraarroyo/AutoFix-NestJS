import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { VehiculosController } from './vehiculos.controller.js';
import { VehiculosService } from './vehiculos.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}