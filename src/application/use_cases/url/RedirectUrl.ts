import { injectable, inject } from 'tsyringe';
import { IShortUrlRepository } from '../../../domain/repositories/IShortUrlRepository';
import { DI_TOKENS } from '../../../shared/constants/diTokens';
import { ShortUrlNotFoundError } from '../../../domain/errors/DomainError';

@injectable()
export class RedirectUrl {
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
