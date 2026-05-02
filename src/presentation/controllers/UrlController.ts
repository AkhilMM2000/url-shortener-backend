import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { CreateShortUrl } from '../../application/use_cases/url/CreateShortUrl';
import { RedirectUrl } from '../../application/use_cases/url/RedirectUrl';
import { createShortUrlSchema } from '../validators/urlRequestValidator';
import { DI_TOKENS } from '../../shared/constants/diTokens';
import { HttpStatus } from '../../shared/constants/httpStatusCodes';
import { catchAsync } from '../../shared/utils/catchAsync';

@injectable()
export class UrlController {
  constructor(
    @inject(DI_TOKENS.CreateShortUrl) private _createShortUrl: CreateShortUrl,
    @inject(DI_TOKENS.RedirectUrl) private _redirectUrl: RedirectUrl
  ) {}

  public create = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Zod Validation (Presentation Layer)
    const validatedBody = createShortUrlSchema.parse(req.body);
    
    // Auth middleware attaches user payload to req.user
    const userId = (req as any).user.userId;
    
    // Construct base URL dynamically for the response
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    // 2. Call Application Use Case
    const output = await this._createShortUrl.execute({
      userId,
      originalUrl: validatedBody.originalUrl,
      baseUrl
    });

    res.status(HttpStatus.CREATED).json(output);
  });

  public redirect = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const shortCode = req.params.shortCode as string;

    const originalUrl = await this._redirectUrl.execute(shortCode);

    res.redirect(HttpStatus.MOVED_PERMANENTLY, originalUrl);
  });
}
