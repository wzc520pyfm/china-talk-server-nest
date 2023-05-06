import { WrongQuestionRecord } from './../../record/entities/wrong-question-record.entity';
/**
 * User实体
 */

import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { State } from 'src/common/enums/state.enum';
import { CollectionQuestion } from 'src/feature/collection/entities/collection-question.entity';
import { Post } from 'src/feature/post/entities/post.entity';
import { GradeRecord } from 'src/feature/record/entities/grade-record.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

/**
 * 用户表
 */
@Entity({
  name: 'user', // 数据库表名, 默认为类名
  orderBy: {
    // 使用find操作和QueryBuilder指定实体的默认排序
    id: 'ASC',
  },
})
export class User {
  // 构造函数, 用户构建实体
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  // 自增主键  -- @PrimaryColumn用于创建主键
  @PrimaryGeneratedColumn({
    comment: '用户id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
    default: 'user',
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ENABLE,
    comment: '用户状态',
  })
  userStatus: boolean;

  @Column({
    type: 'varchar', // 列类型
    name: 'phone', // 数据库表中的列名(默认为属性名)
    length: 16, // 列长度
    nullable: false, // 列可否为空(默认false)
    select: true, // 查询时是否隐藏此列,设为false则列数据不会显示标准查询(默认true)
    primary: false, // 标记为主列(作用等同于@PrimaryColumn)
    unique: false, // 将列标记为唯一列(创建唯一约束)
    comment: '手机号', // 数据库列备注
  })
  // 值校验: 是否是手机号
  @IsMobilePhone('zh-CN', {
    message: '手机号格式不正确', // 自定义验证失败信息
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 64,
    select: false,
    comment: '用户密码',
  })
  // 值校验: 是否不为空
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
    comment: '邮箱',
  })
  // 值校验: 是否不为空
  @IsNotEmpty()
  email: string;

  //TODO mysql支持枚举
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
    comment: '角色',
  })
  role: Role;

  // 一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。无需设置此列，该值将自动设置。
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时自动增长实体版本（增量编号）。无需设置此列，该值将自动设置。
  @VersionColumn({
    comment: '版本号',
  })
  version: any;

  /**
   * 定义关系: 一个user可以有多个post,那么就是一对多的关系
   */
  @OneToMany((type) => Post, (post) => post.user)
  posts: Array<Post>;

  @OneToMany((type) => CollectionQuestion, (collectionQuestions) => collectionQuestions.user)
  collectionQuestions: Array<CollectionQuestion>;

  @OneToMany((type) => GradeRecord, (gradeRecords) => gradeRecords.user)
  gradeRecords: Array<GradeRecord>;

  @OneToMany((type) => GradeRecord, (wrongQuestionRecords) => wrongQuestionRecords.user)
  wrongQuestionRecords: Array<WrongQuestionRecord>;
}
