import { ShortUrl } from '../../domain/models/ShortUrl';
import { CreateShortUrlOutput } from '../dtos/url/CreateShortUrlOutput';

export class ShortUrlMapper {
  static toCreateOutput(domainEntity: ShortUrl, baseUrl: string): CreateShortUrlOutput {
    return {
      shortUrl: `${baseUrl}/${domainEntity.shortCode}`,
      originalUrl: domainEntity.originalUrl,
    };
  }
}
