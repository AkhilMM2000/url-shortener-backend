import { injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import { HashService } from '../../application/services/HashService';

@injectable()
export class BcryptHashService implements HashService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
