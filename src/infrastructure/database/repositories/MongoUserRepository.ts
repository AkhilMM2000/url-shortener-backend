import { injectable } from 'tsyringe';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/models/User';
import { UserModel } from '../models/UserSchema';

@injectable()
export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).lean();
    if (!userDoc) return null;

    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
      createdAt: userDoc.createdAt as Date,
    };
  }

  async save(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();

    return {
      id: savedUser._id.toString(),
      email: savedUser.email,
      passwordHash: savedUser.passwordHash,
      createdAt: savedUser.createdAt as Date,
    };
  }
}
