import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existente = await this.prisma.usuarios.findUnique({ 
      where: { email: dto.email } 
    });
    
    if (existente) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    
    return this.prisma.usuarios.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        password_hash: passwordHash,
        role: dto.role,
      },
      select: { id: true, nombre: true, email: true, role: true }
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.usuarios.findUnique({ 
      where: { email: dto.email } 
    });
    
    if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'mi-clave-secreta-super-segura-123',
      { expiresIn: '8h' }
    );

    return { 
      access_token: token, 
      usuario: { 
        id: user.id, 
        nombre: user.nombre, 
        email: user.email, 
        role: user.role 
      } 
    };
  }
}