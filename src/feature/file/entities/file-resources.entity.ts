import { ActionRecords } from 'src/common/entities/action-records.entity';
import { User } from 'src/feature/user/entities/user.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 文件资源嵌入式实体
 */
export class FileResource {
  constructor(partial: Partial<FileResource>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({
    comment: '文件资源id',
  })
  id: number;

  @Column({
    comment: '文件资源名称',
  })
  name: string;

  @Column({
    comment: '文件资源原始名称',
  })
  originalname: string;

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

  @Column((type) => ActionRecords)
  actionRecords: ActionRecords;

  // 修改人
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modifierUser' })
  user: User;
}
