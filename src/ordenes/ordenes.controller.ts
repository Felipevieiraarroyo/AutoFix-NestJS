import { Body, Controller, Post } from '@nestjs/common';
import { OrdenesService } from './ordenes.service.js';
import { CreateOrdenDto } from './dto/create-orden.dto.js';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  crear(@Body() body: CreateOrdenDto) {
    return this.ordenesService.crear(body);
  }
}