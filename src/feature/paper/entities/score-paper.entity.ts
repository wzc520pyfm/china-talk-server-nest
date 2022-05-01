import { Mark } from 'src/common/enums/mark.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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
    comment: '试卷id',
  })
  paperId: number;

  @Column({
    comment: '问题id',
  })
  questionId: number;

  @Column({
    comment: '分值',
  })
  score: number;

  @Column({
    comment: '创建人id',
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
