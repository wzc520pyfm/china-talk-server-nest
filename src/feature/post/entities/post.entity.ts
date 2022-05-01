import { IsNotEmpty } from 'class-validator';
import { Mark } from 'src/common/enums/mark.enum';

/**
 * 帖子表
 */

import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({
  orderBy: {
    updateTime: 'DESC',
  },
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column({
    type: 'text',
  })
  @IsNotEmpty()
  content: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @VersionColumn({
    comment: '版本号',
  })
  version: any;

  @Column({
    type: 'enum',
    enum: Mark,
    default: Mark.NORMAL,
    comment: '标记',
  })
  mark: Mark;

  // 在 @ManyToOne 一侧，即在外键拥有者一侧，设置 onDelete，就可以使用外键的级联功能，这里设置级联删除，当删除 user 时，user 的所有 post 会被级联删除
  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
