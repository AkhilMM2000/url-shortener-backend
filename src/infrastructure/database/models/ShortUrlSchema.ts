import mongoose, { Document, Schema } from 'mongoose';

export interface IShortUrlDocument extends Document {
  originalUrl: string;
  shortCode: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ShortUrlSchema = new Schema<IShortUrlDocument>({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for Option A: checking if a user already shortened a specific URL
ShortUrlSchema.index({ userId: 1, originalUrl: 1 });

export const ShortUrlModel = mongoose.model<IShortUrlDocument>('ShortUrl', ShortUrlSchema);
