import { Mark } from 'src/common/enums/mark.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({
  name: 'word_link_question',
  orderBy: {
    id: 'ASC',
  },
})
export class WordLinkQuestion {
  @PrimaryGeneratedColumn({
    comment: '记录id',
  })
  id: number;

  @Column({
    comment: '字词id',
  })
  wordId: number;

  @Column({
    comment: '题目id',
  })
  questionId: number;

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
}
