export interface ShortUrlProps {
  id?: string;
  originalUrl: string;
  shortCode: string;
  userId: string;
  createdAt?: Date;
}

export class ShortUrl {
  public readonly id?: string;
  public readonly originalUrl: string;
  public readonly shortCode: string;
  public readonly userId: string;
  public readonly createdAt: Date;

  constructor(props: ShortUrlProps) {
    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortCode = props.shortCode;
    this.userId = props.userId;
    this.createdAt = props.createdAt || new Date();
  }
}
