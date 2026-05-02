import { ShortUrl } from '../../domain/models/ShortUrl';
import { CreateShortUrlOutput } from '../dtos/url/CreateShortUrlOutput';

export class ShortUrlMapper {
  static toCreateOutput(domainEntity: ShortUrl): CreateShortUrlOutput {
    return {
      shortCode: domainEntity.shortCode,
      originalUrl: domainEntity.originalUrl,
    };
  }
}
