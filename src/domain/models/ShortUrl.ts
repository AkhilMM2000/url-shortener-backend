export class ShortUrl {
  constructor(
    public readonly id: string,
    public readonly originalUrl: string,
    public readonly shortCode: string,
    public readonly userId: string,
    public readonly createdAt: Date,
  ) {}
}
