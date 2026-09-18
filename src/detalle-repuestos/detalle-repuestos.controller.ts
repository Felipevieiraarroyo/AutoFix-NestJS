import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DetalleRepuestosService } from './detalle-repuestos.service.js';
import { CreateDetalleRepuestoDto } from './dto/create-detalle-repuesto.dto.js';
import { UpdateDetalleRepuestoDto } from './dto/update-detalle-repuesto.dto.js';

@Controller('detalle-repuestos')
export class DetalleRepuestosController {
  constructor(
    private readonly detalleRepuestosService: DetalleRepuestosService,
  ) {}

  @Post()
  create(
    @Body() createDetalleRepuestoDto: CreateDetalleRepuestoDto,
  ) {
    return this.detalleRepuestosService.create(
      createDetalleRepuestoDto,
    );
  }

  @Get()
  findAll() {
    return this.detalleRepuestosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detalleRepuestosService.findOne(id);
  }

  @Patch(':id')
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detalleRepuestosService.remove(id);
  }
}