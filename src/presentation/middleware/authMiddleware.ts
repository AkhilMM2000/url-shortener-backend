import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ITokenService } from '../../application/services/ITokenService';
import { InvalidTokenError } from '../../domain/errors/DomainError';
import { DI_TOKENS } from '../../shared/constants/diTokens';
import { ERROR_MESSAGES } from '../../shared/constants/errorMessages';

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
      throw new InvalidTokenError(ERROR_MESSAGES.AUTH.TOKEN_REQUIRED);
    }

    const token = authHeader.split(' ')[1];
  
    const tokenService = container.resolve<ITokenService>(DI_TOKENS.ITokenService);
   
    try {
      const payload = tokenService.verifyAccessToken(token);
      req.user = { userId: payload.userId };
      next();
    } catch (jwtError: any) {
      // Map JWT specific errors to our Domain errors
      if (jwtError.name === 'TokenExpiredError') {
        throw new InvalidTokenError(ERROR_MESSAGES.AUTH.INVALID_TOKEN);
      }
      throw new InvalidTokenError(ERROR_MESSAGES.AUTH.INVALID_TOKEN);
    }
  } catch (error) {
    next(error);
  }
};
