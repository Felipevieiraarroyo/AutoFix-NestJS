import { Body, Controller, Post } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  crear(@Body() body: CreateVehiculoDto) {
    return this.vehiculosService.crear(body);
  }
}