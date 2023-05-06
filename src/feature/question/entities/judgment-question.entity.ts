import { ActionRecords } from 'src/common/entities/action-records.entity';
import { Mark } from 'src/common/enums/mark.enum';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { QuestionDifficulty } from 'src/common/enums/question-difficulty.enum';
import { User } from 'src/feature/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

/**
 * 判断题表
 */
@Entity({
  name: 'judgment_question',
  orderBy: {
    id: 'ASC',
  },
})
export class JudgmentQuestion {
  constructor(partial: Partial<JudgmentQuestion>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({
    comment: '判断题id',
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
    comment: '答案',
  })
  answer: boolean;

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
  @OneToOne(() => Question, (question) => question.judgmentQuestion, {
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
