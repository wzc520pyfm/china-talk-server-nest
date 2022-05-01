import { ActionRecords } from 'src/common/entities/action-records.entity';
import { AnswerResources } from 'src/feature/file/entities/answer-resources.entity';
import { ContentResources } from 'src/feature/file/entities/content-resources.entity';
import { Word } from 'src/feature/knowledge/entities/word.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JudgmentQuestion } from './judgment-question.entity';
import { NarrateQuestion } from './narrate-question.entity';
import { SelectQuestion } from './select-question.entity';

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
    comment: '问题记录id',
  })
  id: number;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 选择题
  @OneToOne(() => SelectQuestion, (selectQuestion) => selectQuestion.question, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  selectQuestion: SelectQuestion;

  // 判断题
  @OneToOne(
    () => JudgmentQuestion,
    (judgmentQuestion) => judgmentQuestion.question,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn()
  judgmentQuestion: JudgmentQuestion;

  // 叙述题
  @OneToOne(
    () => NarrateQuestion,
    (narrateQuestion) => narrateQuestion.question,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn()
  narrateQuestion: NarrateQuestion;

  // 内容资源
  @OneToMany(
    (type) => ContentResources,
    (contentResources) => contentResources.question,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'content_resources_id' })
  contentResources: ContentResources;

  // 解答资源
  @OneToMany(
    (type) => AnswerResources,
    (answerResources) => answerResources.question,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'answer_resources_id' })
  answerResources: AnswerResources;

  // 关键字词
  @ManyToMany(() => Word, (words) => words.questions)
  @JoinTable()
  words: Array<Word>;
}
