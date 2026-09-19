import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DetalleRepuestosService } from './detalle-repuestos.service.js';
import { CreateDetalleRepuestoDto } from './dto/create-detalle-repuesto.dto.js';
import { UpdateDetalleRepuestoDto } from './dto/update-detalle-repuesto.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('detalle-repuestos')
export class DetalleRepuestosController {
  constructor(
    private readonly detalleRepuestosService: DetalleRepuestosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'MECANICO')
  create(
    @Body() createDetalleRepuestoDto: CreateDetalleRepuestoDto,
  ) {
    return this.detalleRepuestosService.create(
      createDetalleRepuestoDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO', 'MECANICO')
  findAll() {
    return this.detalleRepuestosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO', 'MECANICO')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detalleRepuestosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'MECANICO')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleRepuestoDto: UpdateDetalleRepuestoDto,
  ) {
    return this.detalleRepuestosService.update(
      id,
      updateDetalleRepuestoDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detalleRepuestosService.remove(id);
  }
}