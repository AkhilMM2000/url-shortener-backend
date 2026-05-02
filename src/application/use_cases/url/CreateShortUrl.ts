import { injectable, inject } from 'tsyringe';
import { nanoid } from 'nanoid';
import { IShortUrlRepository } from '../../../domain/repositories/IShortUrlRepository';
import { DI_TOKENS } from '../../../shared/constants/diTokens';
import { ShortUrl } from '../../../domain/models/ShortUrl';
import { UrlGenerationError } from '../../../domain/errors/DomainError';
import { ICreateShortUrlUseCase } from './ICreateShortUrlUseCase';
import { CreateShortUrlInput } from '../../dtos/url/CreateShortUrlInput';
import { CreateShortUrlOutput } from '../../dtos/url/CreateShortUrlOutput';
import { ShortUrlMapper } from '../../mappers/ShortUrlMapper';

@injectable()
export class CreateShortUrl implements ICreateShortUrlUseCase {
  constructor(
    @inject(DI_TOKENS.IShortUrlRepository) private _shortUrlRepository: IShortUrlRepository
  ) {}

  async execute(input: CreateShortUrlInput): Promise<CreateShortUrlOutput> {
    const { userId, originalUrl } = input;

    // Option A: If the user already shortened this exact URL, return the existing one
    const existing = await this._shortUrlRepository.findByUserIdAndUrl(userId, originalUrl);
    if (existing) {
      return ShortUrlMapper.toCreateOutput(existing);
    }

    // Try to generate and save a new short URL, handling extremely rare collisions
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      const shortCode = nanoid(6);
      
      const newShortUrl = new ShortUrl({
        originalUrl,
        shortCode,
        userId,
      });

      try {
        const savedUrl = await this._shortUrlRepository.save(newShortUrl);
        return ShortUrlMapper.toCreateOutput(savedUrl);
      } catch (error: unknown) {
        // Safe type narrowing for Mongo duplicate key error
        if (
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          (error as { code: number }).code === 11000
        ) {
          continue; // collision occurred, retry
        }
        throw error; // throw any other database errors
      }
    }

    // If we exhaust all retries, throw a pure domain error
    throw new UrlGenerationError();
  }
}
