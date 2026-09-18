import { Body, Controller, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  crear(@Body() body: CreateClienteDto) {
    return this.clientesService.crear(body);
  }
}