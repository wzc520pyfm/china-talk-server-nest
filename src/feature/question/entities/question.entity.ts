import { Mark } from 'src/common/enums/mark.enum';
import { QuestionType } from 'src/common/enums/question-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

/**
 * 问题表
 */
@Entity({
  name: 'questions',
  orderBy: {
    id: 'ASC',
  },
})
export class Question {
  @PrimaryGeneratedColumn({
    comment: '问题id',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: QuestionType,
    comment: '问题类型',
  })
  type: QuestionType;

  @Column({
    comment: '修改人id',
  })
  modifierId: number;

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
