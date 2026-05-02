import { injectable, inject } from 'tsyringe';
import { IShortUrlRepository } from '../../../domain/repositories/IShortUrlRepository';
import { DI_TOKENS } from '../../../shared/constants/diTokens';
import { ShortUrlNotFoundError } from '../../../domain/errors/DomainError';
import { IRedirectUrlUseCase } from './IRedirectUrlUseCase';

@injectable()
export class RedirectUrl implements IRedirectUrlUseCase {
  constructor(
    @inject(DI_TOKENS.IShortUrlRepository) private _shortUrlRepository: IShortUrlRepository
  ) {}

  async execute(shortCode: string): Promise<string> {
    const shortUrl = await this._shortUrlRepository.findByShortCode(shortCode);
    
    if (!shortUrl) {
      throw new ShortUrlNotFoundError();
    }

    return shortUrl.originalUrl;
  }
}
