import { LoginUserOutput } from '../../dtos/auth/LoginUserOutput';

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<LoginUserOutput>;
}
