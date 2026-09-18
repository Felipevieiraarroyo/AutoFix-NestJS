import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { OrdenesController } from './ordenes.controller.js';
import { OrdenesService } from './ordenes.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}