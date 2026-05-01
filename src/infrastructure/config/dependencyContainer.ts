import { container } from 'tsyringe';
import { MongoUserRepository } from '../database/repositories/MongoUserRepository';
import { BcryptHashService } from '../services/BcryptHashService';
import { JwtTokenService } from '../services/JwtTokenService';
import { RegisterUser } from '../../application/use_cases/auth/RegisterUser';
import { LoginUser } from '../../application/use_cases/auth/LoginUser';
import { RefreshToken } from '../../application/use_cases/auth/RefreshToken';
import { DI_TOKENS } from '../../shared/constants/diTokens';

export function setupDI() {
  container.register(DI_TOKENS.IUserRepository, { useClass: MongoUserRepository });
  container.register(DI_TOKENS.HashService, { useClass: BcryptHashService });
  container.register(DI_TOKENS.ITokenService, { useClass: JwtTokenService });
  
  // Register Use Cases as Singletons
  container.registerSingleton(DI_TOKENS.IRegisterUserUseCase, RegisterUser);
  container.registerSingleton(DI_TOKENS.ILoginUserUseCase, LoginUser);
  container.registerSingleton(DI_TOKENS.IRefreshTokenUseCase, RefreshToken);
}
