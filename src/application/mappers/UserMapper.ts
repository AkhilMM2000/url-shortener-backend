import { User } from '../../domain/models/User';
import { RegisterUserOutput } from '../dtos/auth/RegisterUserOutput';

export class UserMapper {
  static toRegisterUserOutput(user: User): RegisterUserOutput {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
