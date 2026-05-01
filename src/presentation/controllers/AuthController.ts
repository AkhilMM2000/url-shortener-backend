import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { registerRequestSchema } from '../validators/authRequestValidator';
import { IRegisterUserUseCase } from '../../application/use_cases/auth/IRegisterUserUseCase';
import { DI_TOKENS } from '../../shared/constants/diTokens';
import { HttpStatus } from '../../shared/constants/httpStatusCodes';
import { catchAsync } from '../../shared/utils/catchAsync';

@injectable()
export class AuthController {
  constructor(
    @inject(DI_TOKENS.IRegisterUserUseCase) private _registerUseCase: IRegisterUserUseCase
  ) {}

  public register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validatedBody = registerRequestSchema.parse(req.body);

    const output = await this._registerUseCase.execute({
      email: validatedBody.email,
      password: validatedBody.password,
    });

    res.status(HttpStatus.CREATED).json(output);
  });
}
