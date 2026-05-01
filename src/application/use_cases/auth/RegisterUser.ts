import { inject, injectable } from 'tsyringe';
import { RegisterUserInput } from '../../dtos/auth/RegisterUserInput';
import { RegisterUserOutput } from '../../dtos/auth/RegisterUserOutput';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { EmailAlreadyExistsError } from '../../../domain/errors/DomainError';
import { HashService } from '../../services/HashService';
import { UserMapper } from '../../mappers/UserMapper';
import { IRegisterUserUseCase } from './IRegisterUserUseCase';
import { DI_TOKENS } from '../../../shared/constants/diTokens';

@injectable()
export class RegisterUser implements IRegisterUserUseCase {
  constructor(
    @inject(DI_TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(DI_TOKENS.HashService) private hashService: HashService
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(input.email);
    }

    const passwordHash = await this.hashService.hash(input.password);

    const newUser = await this.userRepository.save({
      email: input.email,
      passwordHash: passwordHash,
    });

    return UserMapper.toRegisterUserOutput(newUser);
  }
}
