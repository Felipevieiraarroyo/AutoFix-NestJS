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
import { RepuestosService } from './repuestos.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('repuestos')
export class RepuestosController {
  constructor(
    private readonly repuestosService: RepuestosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO')
  create(@Body() createRepuestoDto: CreateRepuestoDto) {
    return this.repuestosService.create(createRepuestoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO', 'MECANICO')
  findAll() {
    return this.repuestosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO', 'MECANICO')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUENO')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRepuestoDto: UpdateRepuestoDto,
  ) {
    return this.repuestosService.update(
      id,
      updateRepuestoDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUENO')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.remove(id);
  }
}