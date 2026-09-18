import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    nombre: string,
    email: string,
    password: string,
    role: string,
  ) {
    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.usuarios.create({
      data: {
        nombre,
        email,
        password_hash: passwordHash,
        role: role as any,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
      },
    });
  }

  async login(email: string, password: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return {
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }
}
