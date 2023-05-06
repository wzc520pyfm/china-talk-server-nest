/**
 * 这是一个创建用户的DTO
 * 但不必重新定义一个类, CreateUserDto实际上是User的一个变体, 对于新增用户,完全可以使用User替代CreateUserDto
 * 但是对于更新用户, 这些属性往往不是全部必填, 而是全部可选, 这时可以使用映射来快速生成新类型
 */

import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['phone', 'password'] as const) {
  @IsString()
  @ValidateIf((o) => o?.role)
  username?: string;

  @IsEmail()
  @ValidateIf((o) => o?.role)
  email?: string;

  // 可以使用@IsEnum()装饰器来指定枚举类型
  @IsEnum(Role)
  @ValidateIf((o) => o?.role) // 条件验证, 只有当role存在时才验证
  role?: Role;
}
