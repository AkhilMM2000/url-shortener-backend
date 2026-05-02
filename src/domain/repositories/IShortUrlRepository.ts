import { ShortUrl } from '../models/ShortUrl';

export interface IShortUrlRepository {
  findByUserIdAndUrl(userId: string, originalUrl: string): Promise<ShortUrl | null>;
  findByShortCode(shortCode: string): Promise<ShortUrl | null>;
  save(shortUrl: ShortUrl): Promise<ShortUrl>;
}
