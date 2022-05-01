import { ActionRecords } from 'src/common/entities/action-records.entity';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { State } from 'src/common/enums/state.enum';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScorePaper } from './score-paper.entity';

/**
 * 试卷表
 */
@Entity({
  name: 'exam_paper',
  orderBy: {
    id: 'ASC',
  },
})
export class ExamPaper {
  @PrimaryGeneratedColumn({
    comment: '试卷id',
  })
  id: number;

  @Column({
    comment: '试卷名称',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: QuestionClassification,
    comment: '试卷类型',
  })
  type: QuestionClassification;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ENABLE,
    comment: '试卷状态',
  })
  status: State;

  @Column({
    nullable: true,
    comment: '试卷描述',
  })
  description: string;

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

  // 成绩记录
  @OneToMany((type) => ScorePaper, (scorePapers) => scorePapers.examPaper)
  scorePapers: ScorePaper;
}
