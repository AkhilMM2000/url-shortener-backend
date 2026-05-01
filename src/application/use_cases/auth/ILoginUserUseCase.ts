import { LoginUserInput } from '../../dtos/auth/LoginUserInput';
import { LoginUserOutput } from '../../dtos/auth/LoginUserOutput';

export interface ILoginUserUseCase {
  execute(input: LoginUserInput): Promise<{ output: LoginUserOutput; refreshToken: string }>;
}
