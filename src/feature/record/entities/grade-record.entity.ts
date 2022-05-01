import { Mark } from 'src/common/enums/mark.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
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
    comment: '试卷id',
  })
  paperId: number;

  @Column({
    comment: '用户id',
  })
  userId: number;

  @Column({
    comment: '成绩(只记录最高分)',
  })
  score: number;

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
