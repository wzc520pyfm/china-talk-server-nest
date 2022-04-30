import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}