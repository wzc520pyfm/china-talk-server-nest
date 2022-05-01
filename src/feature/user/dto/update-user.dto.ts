import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(
  PickType(User, ['username', 'email', 'phone', 'password', 'role'] as const),
) {}
