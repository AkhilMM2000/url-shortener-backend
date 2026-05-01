import { RegisterUserInput } from '../../dtos/auth/RegisterUserInput';
import { RegisterUserOutput } from '../../dtos/auth/RegisterUserOutput';

export interface IRegisterUserUseCase {
  execute(input: RegisterUserInput): Promise<RegisterUserOutput>;
}
