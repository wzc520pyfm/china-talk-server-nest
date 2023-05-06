import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post as PostEntity } from './entities/post.entity'; // 可以使用as来为post指定一个别名
import { Result } from 'src/common/interfaces/result.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  /**
   * 创建一个 post
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any, @Body() createInput: PostEntity): Promise<Result> {
    /**
     * 因为我们在实体中使用了级联,接着在下面为二者建立联系,就仅需要在service中save post即可, 否则post和user就需要分别save
     * see: https://github.com/typeorm/typeorm 中的 '使用级联自动保存相关对象'
     */
    createInput.user = req.user; // 连接post和user
    await this.postService.create(createInput);
    return { code: 200, message: '创建帖子成功' };
  }

  /**
   * 查询当前用户的所有post
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: any): Promise<Result> {
    const posts = await this.postService.findAll(req.user.id);
    return { code: 200, message: '查询成功', data: { posts } };
  }

  /**
   * 更新指定文章的主体信息
   */
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateContent(
    @Req() req: any,
    @Body('content') updateContent: string,
    @Param('id') id: number,
  ): Promise<Result> {
    await this.postService.updateContent(id, updateContent);
    return { code: 200, message: '更新成功' };
  }

  /**
   * 更加复杂的例子
   */
  @Get('common')
  @UseGuards(AuthGuard('jwt'))
  async findAllPostsAndLimit(
    @Req() req: any,
    @Query('title') title: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    // @Param() params: { title?: string; offset?: number; limit?: number },
  ): Promise<Result> {
    console.log(req.user.id, title, offset, limit);
    const posts = await this.postService.findAllPostsAndLimit(req.user.id, title, offset, limit);
    return { code: 200, message: '查询成功', data: { posts } };
  }
}
