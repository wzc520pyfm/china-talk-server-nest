import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * 创建一个 post
   */
  async create(createInput: Post): Promise<void> {
    await this.postRepository.save(createInput);
  }

  /**
   * 查询指定用户的所有 post
   */
  async findAll(userId: number): Promise<Post[]> {
    return await this.postRepository.find({ where: { user: { id: userId } } });
  }

  /**
   * 更新指定post的主体信息
   */
  async updateContent(id: number, updateContent: string): Promise<void> {
    const post = await this.postRepository.findOneBy({ id });
    post.content = updateContent;
    await this.postRepository.update(id, post);
  }

  /**
   * 查询指定用户的所有post并记录条数
   */
  async findAllAndCount(userId: number): Promise<{ postsCount: number; posts: Post[] }> {
    const [posts, postsCount] = await this.postRepository.findAndCount({
      where: { user: { id: userId } },
    });
    return { posts, postsCount };
  }

  /**
   * 查询指定用户的指定title的所有post并以分页的形式返回, 默认以post.id降序排序
   * @param userId 用户id
   * @param title 标题
   * @param offset 跳过指定数量的数据
   * @param limit 查询指定数量的数据
   * @returns Array<post>
   */
  async findAllPostsAndLimit(
    userId: number,
    title: string,
    offset: number,
    limit: number,
  ): Promise<Array<Post>> {
    // 分页查询 注释掉的写法不够优雅, 更推荐使用queryBuilder
    // return await this.postRepository.find({
    //   where: { user: { id: userId } },
    //   skip: offset,
    //   take: limit,
    // });
    return await this.postRepository
      .createQueryBuilder('post') // 创建queryBuilder
      .leftJoinAndSelect('post.user', 'user') // 左连接user
      .where('user.id = :userId', { userId }) // 连接条件
      .orderBy('post.id', 'DESC') // 排序
      .skip(offset) // 跳过
      .take(limit) // 数量
      .setParameters({ title: title }) // 查询条件
      .getMany();
  }
}
