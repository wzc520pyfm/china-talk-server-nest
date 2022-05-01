import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { QuestionDifficulty } from 'src/common/enums/question-difficulty.enum';
import { Question } from './question.entity';
import { User } from 'src/feature/user/entities/user.entity';
import { ActionRecords } from 'src/common/entities/action-records.entity';

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
    comment: '选择题id',
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
    comment: '提示',
  })
  tip: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '解析',
  })
  analysis: string;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 问题记录
  @OneToOne(() => Question, (question) => question.selectQuestion, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  question: Question;

  // 发布者
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  // 修改人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'modifier_id' })
  modifier: User;
}
