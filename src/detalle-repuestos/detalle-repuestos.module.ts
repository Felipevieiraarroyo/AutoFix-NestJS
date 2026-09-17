import { Module } from '@nestjs/common';
import { DetalleRepuestosController } from './detalle-repuestos.controller.js';
import { DetalleRepuestosService } from './detalle-repuestos.service.js';

@Module({
  controllers: [DetalleRepuestosController],
  providers: [DetalleRepuestosService]
})
export class DetalleRepuestosModule {}
