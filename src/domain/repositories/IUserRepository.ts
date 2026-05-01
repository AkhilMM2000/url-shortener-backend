import { User } from '../models/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
}
