export const DI_TOKENS = {
  IUserRepository: Symbol.for('IUserRepository'),
  HashService: Symbol.for('HashService'),
  IRegisterUserUseCase: Symbol.for('IRegisterUserUseCase'),
  ITokenService: Symbol.for('ITokenService'),
  ILoginUserUseCase: Symbol.for('ILoginUserUseCase'),
  IRefreshTokenUseCase: Symbol.for('IRefreshTokenUseCase'),
  IShortUrlRepository: Symbol.for('IShortUrlRepository'),
  ICreateShortUrlUseCase: Symbol.for('ICreateShortUrlUseCase'),
  IRedirectUrlUseCase: Symbol.for('IRedirectUrlUseCase'),
};
