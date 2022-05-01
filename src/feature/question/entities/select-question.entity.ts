import { Mark } from '../../../common/enums/mark.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { QuestionDifficulty } from 'src/common/enums/question-difficulty.enum';

/**
 * 选择题表
 */
@Entity({
  name: 'select_question',
  orderBy: {
    id: 'ASC',
  },
})
export class SelectQuestion {
  constructor(partial: Partial<SelectQuestion>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({
    comment: '问题id',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: QuestionClassification,
    comment: '问题分类',
  })
  questionClassification: QuestionClassification;

  @Column({
    type: 'enum',
    enum: QuestionDifficulty,
    comment: '问题难度',
  })
  questionDifficulty: QuestionDifficulty;

  @Column({
    type: 'text',
    comment: '问题内容',
  })
  content: string;

  @Column({
    nullable: true,
    comment: '内容资源id',
  })
  contentResourceId: number;

  @Column({
    comment: '选项1',
  })
  option1: string;

  @Column({
    comment: '选项2',
  })
  option2: string;

  @Column({
    nullable: true,
    comment: '选项3',
  })
  option3: string;

  @Column({
    nullable: true,
    comment: '选项4',
  })
  option4: string;

  @Column({
    nullable: true,
    comment: '选项5',
  })
  option5: string;

  @Column({
    nullable: true,
    comment: '选项6',
  })
  option6: string;

  @Column({
    comment: '答案',
  })
  answer: string;

  @Column({
    nullable: true,
    comment: '答案资源id',
  })
  answerResourceId: number;

  @Column({
    comment: '出题人id',
  })
  creatorId: number;

  @Column({
    nullable: true,
    comment: '提示',
  })
  tip: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '解析',
  })
  analysis: string;

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
