import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
<<<<<<< HEAD
import { PrismaModule } from './vehiculos/prisma/prisma.module.js';
import { VehiculosModule } from './vehiculos/vehiculos.module.js';
=======
import { PrismaModule } from './prisma/prisma.module.js';
import { RepuestosModule } from './repuestos/repuestos.module.js';
import { DetalleRepuestosModule } from './detalle-repuestos/detalle-repuestos.module.js';
>>>>>>> bbf4a5e1267a76680c56519039ded4c1baad5936

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'AutoFix-NestJS',
    }),
    PrismaModule,
<<<<<<< HEAD
    VehiculosModule,
=======
    RepuestosModule,
    DetalleRepuestosModule,
>>>>>>> bbf4a5e1267a76680c56519039ded4c1baad5936
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
