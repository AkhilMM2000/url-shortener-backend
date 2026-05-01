import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { z } from 'zod';
import { registerRequestSchema } from '../validators/authRequestValidator';
import { DomainError } from '../../domain/errors/DomainError';
import { IRegisterUserUseCase } from '../../application/use_cases/auth/IRegisterUserUseCase';
import { DI_TOKENS } from '../../shared/constants/diTokens';
import { HttpStatus } from '../../shared/constants/httpStatusCodes';

@injectable()
export class AuthController {
  constructor(
    @inject(DI_TOKENS.IRegisterUserUseCase) private _registerUseCase: IRegisterUserUseCase
  ) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedBody = registerRequestSchema.parse(req.body);

      const output = await this._registerUseCase.execute({
        email: validatedBody.email,
        password: validatedBody.password,
      });

      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: 'Validation Error', details: error.flatten().fieldErrors });
        return;
      }
      if (error instanceof DomainError) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        return;
      }
      next(error); 
    }
  };
}
