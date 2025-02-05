
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
    constructor(config: ConfigService, private prisma: PrismaService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
        secretOrKey: config.get<string>('JWT_SECRET') || 'default_secret', 
      });
    }

    async validate(payload: {
        sub: number;
        email: string;
      }) {
      const user =
        await this.prisma.user.findUnique({
          select: {
            id: true,
            email: true,
            createdAt: true,
         },
          where: {
            id: payload.sub,
          },
        });

      
        return user;
      }
}
