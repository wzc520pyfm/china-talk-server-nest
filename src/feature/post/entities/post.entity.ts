import { IsNotEmpty } from 'class-validator';
import { ActionRecords } from 'src/common/entities/action-records.entity';
import { User } from 'src/feature/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 帖子表
 */
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

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 发布者
  // 在 @ManyToOne 一侧，即在外键拥有者一侧，设置 onDelete，就可以使用外键的级联功能，这里设置级联删除，当删除 user 时，user 的所有 post 会被级联删除
  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
