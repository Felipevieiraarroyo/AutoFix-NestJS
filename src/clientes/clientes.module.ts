import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ClientesController } from './clientes.controller.js';
import { ClientesService } from './clientes.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}