import { container } from 'tsyringe';
import { MongoUserRepository } from '../database/repositories/MongoUserRepository';
import { BcryptHashService } from '../services/BcryptHashService';
import { RegisterUser } from '../../application/use_cases/auth/RegisterUser';
import { DI_TOKENS } from '../../shared/constants/diTokens';

export function setupDI() {
  container.register(DI_TOKENS.IUserRepository, { useClass: MongoUserRepository });
  container.register(DI_TOKENS.HashService, { useClass: BcryptHashService });
  
  // Register Use Cases as Singletons
  container.registerSingleton(DI_TOKENS.IRegisterUserUseCase, RegisterUser);
}
