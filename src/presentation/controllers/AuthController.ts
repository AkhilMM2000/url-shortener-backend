import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { loginRequestSchema, registerRequestSchema } from '../validators/authRequestValidator';
import { IRegisterUserUseCase } from '../../application/use_cases/auth/IRegisterUserUseCase';
import { ILoginUserUseCase } from '../../application/use_cases/auth/ILoginUserUseCase';
import { IRefreshTokenUseCase } from '../../application/use_cases/auth/IRefreshTokenUseCase';
import { DI_TOKENS } from '../../shared/constants/diTokens';
import { HttpStatus } from '../../shared/constants/httpStatusCodes';
import { catchAsync } from '../../shared/utils/catchAsync';

@injectable()
export class AuthController {
  constructor(
    @inject(DI_TOKENS.IRegisterUserUseCase) private _registerUseCase: IRegisterUserUseCase,
    @inject(DI_TOKENS.ILoginUserUseCase) private _loginUseCase: ILoginUserUseCase,
    @inject(DI_TOKENS.IRefreshTokenUseCase) private _refreshTokenUseCase: IRefreshTokenUseCase
  ) {}

  public register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validatedBody = registerRequestSchema.parse(req.body);

    const output = await this._registerUseCase.execute({
      email: validatedBody.email,
      password: validatedBody.password,
    });

    res.status(HttpStatus.CREATED).json(output);
  });

  public login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validatedBody = loginRequestSchema.parse(req.body);

    const { output, refreshToken } = await this._loginUseCase.execute({
      email: validatedBody.email,
      password: validatedBody.password,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(HttpStatus.OK).json(output);
  });

  public refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;

    const output = await this._refreshTokenUseCase.execute(refreshToken);

    res.status(HttpStatus.OK).json(output);
  });
}
