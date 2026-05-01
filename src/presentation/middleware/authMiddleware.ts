import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ITokenService } from '../../application/services/ITokenService';
import { InvalidTokenError } from '../../domain/errors/DomainError';
import { DI_TOKENS } from '../../shared/constants/diTokens';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new InvalidTokenError('Authorization header missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    
    const tokenService = container.resolve<ITokenService>(DI_TOKENS.ITokenService);
    const payload = tokenService.verifyAccessToken(token);

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next(error);
  }
};
