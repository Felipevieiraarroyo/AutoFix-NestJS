import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Verifica el token y lo guarda en request.user
      request.user = jwt.verify(
        header.split(' ')[1], 
        process.env.JWT_SECRET || 'mi-clave-secreta-super-segura-123'
      );
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}