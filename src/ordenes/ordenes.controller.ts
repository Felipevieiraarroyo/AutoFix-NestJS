import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdenesService } from './ordenes.service.js';
import { CreateOrdenDto } from './dto/create-orden.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA')
  crear(@Body() body: CreateOrdenDto) {
    return this.ordenesService.crear(body);
  }
}