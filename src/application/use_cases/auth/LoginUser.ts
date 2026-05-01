import { inject, injectable } from 'tsyringe';
import { ILoginUserUseCase } from './ILoginUserUseCase';
import { LoginUserInput } from '../../dtos/auth/LoginUserInput';
import { LoginUserOutput } from '../../dtos/auth/LoginUserOutput';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { HashService } from '../../services/HashService';
import { ITokenService } from '../../services/ITokenService';
import { InvalidCredentialsError } from '../../../domain/errors/DomainError';
import { DI_TOKENS } from '../../../shared/constants/diTokens';

@injectable()
export class LoginUser implements ILoginUserUseCase {
  constructor(
    @inject(DI_TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(DI_TOKENS.HashService) private hashService: HashService,
    @inject(DI_TOKENS.ITokenService) private tokenService: ITokenService
  ) {}

  async execute(input: LoginUserInput): Promise<{ output: LoginUserOutput; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(input.email);
    
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.hashService.compare(input.password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const payload = { userId: user.id };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      output: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      refreshToken,
    };
  }
}
