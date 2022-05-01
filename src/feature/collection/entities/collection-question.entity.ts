import { Mark } from 'src/common/enums/mark.enum';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 题目收藏表
 */
export class CollectionQuestion {
  constructor(partial: Partial<CollectionQuestion>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({
    comment: '收藏id',
  })
  id: number;

  @Column({
    comment: '问题id',
  })
  questionId: number;

  @Column({
    comment: '用户id',
  })
  userId: number;

  @Column({
    comment: '试卷id',
  })
  paperId: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: Mark,
    default: Mark.NORMAL,
    comment: '标记',
  })
  mark: Mark;
}
