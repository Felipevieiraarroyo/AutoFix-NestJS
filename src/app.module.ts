import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { VehiculosModule } from './vehiculos/vehiculos.module.js';
import { OrdenesModule } from './ordenes/ordenes.module.js';
import { RepuestosModule } from './repuestos/repuestos.module.js'; 
import { DetalleRepuestosModule } from './detalle-repuestos/detalle-repuestos.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    PrismaModule,
    ClientesModule,
    VehiculosModule,
    OrdenesModule,
    RepuestosModule,
    DetalleRepuestosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
