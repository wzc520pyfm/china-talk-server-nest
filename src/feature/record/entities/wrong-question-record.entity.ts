import { ActionRecords } from 'src/common/entities/action-records.entity';
import { ExamPaper } from 'src/feature/paper/entities/exam-paper.entity';
import { Question } from 'src/feature/question/entities/question.entity';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
    comment: '上次的错误回答记录(记录用户上次答错时输入的答案)',
  })
  lastWrongAnswer: string;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 试卷
  @ManyToOne((type) => ExamPaper, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  examPaper: ExamPaper;

  // 用户
  @ManyToOne((type) => User, (user) => user.wrongQuestionRecords, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  // 问题记录
  @ManyToOne((type) => Question, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  question: Question;
}
