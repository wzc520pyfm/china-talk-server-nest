import { ActionRecords } from 'src/common/entities/action-records.entity';
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
import { ExamPaper } from './exam-paper.entity';

@Entity({
  name: 'score_paper',
  orderBy: {
    id: 'ASC',
  },
})
export class ScorePaper {
  @PrimaryGeneratedColumn({
    comment: '分值记录id',
  })
  id: number;

  @Column({
    comment: '分值',
  })
  score: number;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 创建人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  // 修改人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'modifier_id' })
  modifier: User;

  // 试卷
  @ManyToOne((type) => ExamPaper, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  examPaper: ExamPaper;

  // 问题记录
  @OneToOne((type) => Question, {
    nullable: false,
  })
  @JoinColumn()
  question: Question;
}
