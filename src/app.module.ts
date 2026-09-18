import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { PrismaModule } from './prisma/prisma.module.js';
import { VehiculosModule } from './vehiculos/vehiculos.module.js';
import { RepuestosModule } from './repuestos/repuestos.module.js';
import { DetalleRepuestosModule } from './detalle-repuestos/detalle-repuestos.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'AutoFix-NestJS',
    }),
    PrismaModule,
    VehiculosModule,
    RepuestosModule,
    DetalleRepuestosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
