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
import { RepuestosService } from './repuestos.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Controller('repuestos')
export class RepuestosController {
  constructor(
    private readonly repuestosService: RepuestosService,
  ) {}

  @Post()
  create(@Body() createRepuestoDto: CreateRepuestoDto) {
    return this.repuestosService.create(createRepuestoDto);
  }

  @Get()
  findAll() {
    return this.repuestosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.findOne(id);
  }

  @Patch(':id')
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.remove(id);
  }
}