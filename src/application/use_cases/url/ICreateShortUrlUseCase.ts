import { CreateShortUrlInput } from '../../dtos/url/CreateShortUrlInput';
import { CreateShortUrlOutput } from '../../dtos/url/CreateShortUrlOutput';

export interface ICreateShortUrlUseCase {
  execute(input: CreateShortUrlInput): Promise<CreateShortUrlOutput>;
}
