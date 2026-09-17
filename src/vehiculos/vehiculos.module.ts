import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service.js';
import { VehiculosController } from './vehiculos.controller.js';

@Module({
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
