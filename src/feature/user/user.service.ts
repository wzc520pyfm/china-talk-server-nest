import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  /**
   * 注入对象
   * @param usersRepository User存储库
   * @param connection 通过它来使用QueryRunner类, 进而处理事务
   * @param cryptoUtil 工具类对象
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async findOneByPhone(phone: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({
      phone,
    });
  }

  async updateOne(id: number, updateUseDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, updateUseDto);
  }

  async createOne(createUserDto: CreateUserDto): Promise<void> {
    const existing = await this.findOneByPhone(createUserDto.phone);
    if (existing) throw new HttpException('用户已存在', 409);
    createUserDto.password = this.cryptoUtil.encryptPassword(
      createUserDto.password,
    ); // 密码加密
    await this.usersRepository.save(createUserDto); // 执行成功会返回一个User实体, 如果后续程序需要这个实体, 请添加return
  }

  async removeOne(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // 不推荐使用装饰器来控制事务(@Transaction()和@TransactionManager())
  // 创建一个事务
  async createMany(createUserDtos: Array<CreateUserDto>) {
    const queryRunner = this.connection.createQueryRunner();

    // 获取连接
    await queryRunner.connect();
    // 开始一个事务
    await queryRunner.startTransaction();
    try {
      // 执行一些操作
      const createTasks = [];
      for (const createUserDto of createUserDtos) {
        createTasks.push(queryRunner.manager.save(createUserDto));
      }
      await Promise.all(createTasks);
      // await queryRunner.manager.save(createUserDtos[0]);
      // await queryRunner.manager.save(createUserDtos[1]);

      // 提交事务
      await queryRunner.commitTransaction();
    } catch (err) {
      // 如果遇到错误, 则回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      // 你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }
  // 或者直接使用一个Connection对象的回调函数的风格的transaction方法
  async createMany2(createUserDtos: Array<CreateUserDto>) {
    await this.connection.transaction(async (manager) => {
      /**
       * 我们不建议在循环中使用await,而是使用Promise.all(),让异步并发执行以提高效率
       */
      const createTasks = [];
      for (const createUserDto of createUserDtos) {
        createTasks.push(manager.save(createUserDto));
      }
      await Promise.all(createTasks);
    });
  }
}
