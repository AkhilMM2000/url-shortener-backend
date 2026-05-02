import { injectable } from 'tsyringe';
import { IShortUrlRepository } from '../../../domain/repositories/IShortUrlRepository';
import { ShortUrl } from '../../../domain/models/ShortUrl';
import { ShortUrlModel } from '../models/ShortUrlSchema';

@injectable()
export class MongoShortUrlRepository implements IShortUrlRepository {
  async findByUserIdAndUrl(userId: string, originalUrl: string): Promise<ShortUrl | null> {
    const doc = await ShortUrlModel.findOne({ userId, originalUrl }).lean();
    if (!doc) return null;
    return new ShortUrl(
      doc._id.toString(),
      doc.originalUrl,
      doc.shortCode,
      doc.userId.toString(),
      doc.createdAt
    );
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    const doc = await ShortUrlModel.findOne({ shortCode }).lean();
    if (!doc) return null;
    return new ShortUrl(
      doc._id.toString(),
      doc.originalUrl,
      doc.shortCode,
      doc.userId.toString(),
      doc.createdAt
    );
  }

  async save(shortUrl: ShortUrl): Promise<ShortUrl> {
    const doc = await ShortUrlModel.create({
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      userId: shortUrl.userId,
      createdAt: shortUrl.createdAt
    });

    return new ShortUrl(
      doc._id.toString(),
      doc.originalUrl,
      doc.shortCode,
      doc.userId.toString(),
      doc.createdAt
    );
  }
}
