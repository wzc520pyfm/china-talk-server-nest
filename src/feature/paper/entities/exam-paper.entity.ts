import { Mark } from 'src/common/enums/mark.enum';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { State } from 'src/common/enums/state.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  @Column({
    comment: '试卷创建人id',
  })
  creatorId: number;

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
