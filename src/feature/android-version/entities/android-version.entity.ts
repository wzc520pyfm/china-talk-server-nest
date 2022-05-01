import { ActionRecords } from './../../../common/entities/action-records.entity';
import { User } from 'src/feature/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column(type => ActionRecords)
  actionRecords: ActionRecords;

  // 修改人信息
  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'modifierId' }) // 自定义关系列名(默认是userId,此处将其改为modifierId), 如果不需要自定义关系列名, 可以省略@JoinColumn. (默认下, 将关联目标实体的主列, 如果需要关联其他列可以设置referencedColumnName: "name", 这样就会关联user实体的name列而不是id列)
  user: User;
}
