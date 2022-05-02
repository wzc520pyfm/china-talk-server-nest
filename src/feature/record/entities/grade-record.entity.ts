import { ActionRecords } from 'src/common/entities/action-records.entity';
import { ExamPaper } from 'src/feature/paper/entities/exam-paper.entity';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 成绩记录表
 */
@Entity({
  name: 'grade_record',
  orderBy: {
    id: 'ASC',
  },
})
export class GradeRecord {
  @PrimaryGeneratedColumn({
    comment: '成绩记录id',
  })
  id: number;

  @Column({
    comment: '成绩(只记录最高分)',
  })
  score: number;

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 试卷
  @ManyToOne((type) => ExamPaper, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  examPaper: ExamPaper;

  // 用户(答题者)
  @ManyToOne((type) => User, (user) => user.gradeRecords, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
