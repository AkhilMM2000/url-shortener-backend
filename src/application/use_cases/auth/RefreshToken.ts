import { inject, injectable } from 'tsyringe';
import { IRefreshTokenUseCase } from './IRefreshTokenUseCase';
import { LoginUserOutput } from '../../dtos/auth/LoginUserOutput';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { ITokenService } from '../../services/ITokenService';
import { InvalidTokenError } from '../../../domain/errors/DomainError';
import { DI_TOKENS } from '../../../shared/constants/diTokens';

@injectable()
export class RefreshToken implements IRefreshTokenUseCase {
  constructor(
    @inject(DI_TOKENS.ITokenService) private tokenService: ITokenService,
    @inject(DI_TOKENS.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(refreshTokenStr: string): Promise<LoginUserOutput> {
    if (!refreshTokenStr) {
      throw new InvalidTokenError('Refresh token is required');
    }

    try {
      const payload = this.tokenService.verifyRefreshToken(refreshTokenStr);
      
      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
         throw new InvalidTokenError('User no longer exists');
      }

      const newAccessToken = this.tokenService.generateAccessToken({ userId: user.id });
      
      return {
        accessToken: newAccessToken,
        user: {
          id: user.id,
          email: user.email
        }
      };
    } catch (error) {
      throw new InvalidTokenError('Invalid or expired refresh token');
    }
  }
}
