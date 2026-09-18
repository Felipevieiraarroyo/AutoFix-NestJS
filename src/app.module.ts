import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { VehiculosModule } from './vehiculos/vehiculos.module.js';
import { OrdenesModule } from './ordenes/ordenes.module.js';
import { DetalleRepuestosModule } from './detalle-repuestos/detalle-repuestos.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    PrismaModule,
    ClientesModule,
    VehiculosModule,
    OrdenesModule,
    RepuestosModule,
    DetalleRepuestosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
