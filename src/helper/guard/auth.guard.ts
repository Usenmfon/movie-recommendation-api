import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('expired token');
    } else if (info instanceof Error) {
      throw new UnauthorizedException('None or unidentified token');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
