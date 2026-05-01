import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { DomainError, EmailAlreadyExistsError } from '../../domain/errors/DomainError';
import { HttpStatus } from '../../shared/constants/httpStatusCodes';

export class ErrorHandlerMiddleware {
  static handle = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof z.ZodError) {
      res.status(HttpStatus.BAD_REQUEST).json({ 
        error: 'Validation Error', 
        details: err.flatten().fieldErrors 
      });
      return;
    }

    if (err instanceof EmailAlreadyExistsError) {
      res.status(HttpStatus.CONFLICT).json({ error: err.message });
      return;
    }

    if (err instanceof DomainError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
      return;
    }

    console.error('Unhandled Exception:', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  };
}

