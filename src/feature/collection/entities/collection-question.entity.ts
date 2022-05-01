import { ActionRecords } from 'src/common/entities/action-records.entity';
import { ExamPaper } from 'src/feature/paper/entities/exam-paper.entity';
import { Question } from 'src/feature/question/entities/question.entity';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 题目收藏表
 */
@Entity({
  name: 'collection_question',
  orderBy: {
    id: 'ASC',
  },
})
export class CollectionQuestion {
  constructor(partial: Partial<CollectionQuestion>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({
    comment: '收藏id',
  })
  id: number;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 问题记录
  @OneToOne(() => Question, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  question: Question;

  // 用户
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  // 试卷
  @OneToOne(() => ExamPaper, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  examPaper: ExamPaper;
}
