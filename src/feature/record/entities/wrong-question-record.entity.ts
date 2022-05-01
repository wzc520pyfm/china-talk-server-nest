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
  name: 'wrong_question_record',
  orderBy: {
    id: 'ASC',
  },
})
export class WrongQuestionRecord {
  @PrimaryGeneratedColumn({
    comment: '错题记录id',
  })
  id: number;

  @Column({
    comment: '试卷id',
  })
  paperId: number;

  @Column({
    comment: '用户id',
  })
  userId: number;

  @Column({
    comment: '题目id',
  })
  questionId: number;

  @Column({
    comment: '上次的错误回答记录(记录用户上次答错时输入的答案)',
  })
  lastWrongAnswer: string;

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
