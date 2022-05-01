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
 * 安卓应用版本记录表
 */
@Entity({
  name: 'android_version',
  orderBy: {
    id: 'ASC',
  },
})
export class AndroidVersion {
  constructor(partial: Partial<AndroidVersion>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({
    comment: '版本id',
  })
  id: number;

  @Column({
    comment: '版本标识',
  })
  versionCode: number;

  @Column({
    type: 'varchar',
    length: 128,
    comment: '版本号',
  })
  versionName: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '版本描述',
  })
  description: string;

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
    comment: '版本号: 记录更新次数',
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
