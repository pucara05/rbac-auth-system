import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token del header Authorization en formato Bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // No ignorar la expiración del token
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Clave secreta para verificar el token
    });
  }

  async validate(payload: any) {
    // Este método se invoca después de que se verifique el token.
    // El valor retornado se asignará a request.user.
    // Puedes agregar lógica adicional, por ejemplo, buscar al usuario en la base de datos.
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}