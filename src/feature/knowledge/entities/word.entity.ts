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
 * 字词表
 */
@Entity({
  name: 'word',
  orderBy: {
    id: 'ASC',
  },
})
export class Word {
  @PrimaryGeneratedColumn({
    comment: '字词id',
  })
  id: number;

  @Column({
    comment: '字词',
  })
  word: string;

  @Column({
    nullable: true,
    comment: '词性',
  })
  phonetic: string;

  @Column({
    nullable: true,
    comment: '释义',
  })
  explain: string;

  @Column({
    nullable: true,
    comment: '英文释义',
  })
  explainEn: string;

  @Column({
    comment: '拼音',
  })
  pinyin: string;

  @Column({
    nullable: true,
    comment: '例句',
  })
  sentence: string;

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
