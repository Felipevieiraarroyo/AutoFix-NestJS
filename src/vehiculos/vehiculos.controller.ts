import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VehiculosService } from './vehiculos.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto.js';

@ApiTags('Vehiculos')
@Controller('api/vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los vehículos registrados con sus dueños',
  })
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get('placa/:placa')
  @ApiOperation({ summary: 'Buscar un vehículo por su placa' })
  findByPlaca(@Param('placa') placa: string) {
    return this.vehiculosService.findByPlaca(placa);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vehículo por su ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un vehículo asociado a un cliente' })
  @ApiResponse({ status: 201, description: 'Vehículo registrado exitosamente' })
  create(@Body() dto: CreateVehiculoDto) {
    return this.vehiculosService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de un vehículo' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVehiculoDto,
  ) {
    return this.vehiculosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar vehículo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculosService.remove(id);
  }
}
