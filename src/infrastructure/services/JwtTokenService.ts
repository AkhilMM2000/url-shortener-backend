import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../application/services/ITokenService';

export class JwtTokenService implements ITokenService {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'default_access_secret', { expiresIn: '1m' });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'default_refresh_secret', { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'default_access_secret') as TokenPayload;
  }

  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'default_refresh_secret') as TokenPayload;
  }
}
