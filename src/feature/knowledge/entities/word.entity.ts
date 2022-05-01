import { ActionRecords } from 'src/common/entities/action-records.entity';
import { Question } from 'src/feature/question/entities/question.entity';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 创建人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  // 修改人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'modifier_id' })
  modifier: User;

  // 问题记录
  @ManyToMany(() => Question, (questions) => questions.words)
  questions: Array<Question>;
}
