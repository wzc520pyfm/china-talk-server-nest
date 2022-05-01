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
  name: 'file_resources',
  orderBy: {
    id: 'ASC',
  },
})
export class FileResource {
  @PrimaryGeneratedColumn({
    comment: '文件资源id',
  })
  id: number;

  @Column({
    comment: '问题id',
  })
  questionId: number;

  @Column({
    comment: '文件资源名称',
  })
  name: string;

  @Column({
    comment: '文件资源类型',
  })
  type: string;

  @Column({
    nullable: true,
    comment: '文件资源大小',
  })
  size: number;

  @Column({
    comment: '文件资源路径',
  })
  path: string;

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
