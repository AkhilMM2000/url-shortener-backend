export const DI_TOKENS = {
  IUserRepository: Symbol.for('IUserRepository'),
  HashService: Symbol.for('HashService'),
  IRegisterUserUseCase: Symbol.for('IRegisterUserUseCase'),
  ITokenService: Symbol.for('ITokenService'),
  ILoginUserUseCase: Symbol.for('ILoginUserUseCase'),
  IRefreshTokenUseCase: Symbol.for('IRefreshTokenUseCase'),
  IShortUrlRepository: Symbol.for('IShortUrlRepository'),
  CreateShortUrl: Symbol.for('CreateShortUrl'),
  RedirectUrl: Symbol.for('RedirectUrl'),
};
