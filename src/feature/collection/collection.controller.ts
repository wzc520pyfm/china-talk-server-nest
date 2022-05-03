import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CollectionService } from './collection.service';
import { CollectionQuestionDto } from './dto/create-collection-question.dto';

@Controller('collections')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  /**
   * 收藏题目
   */
  @Post('question')
  async collectQuestion(
    @Request() req: any,
    @Body() collectionQuestionDto: CollectionQuestionDto,
  ): Promise<Result> {
    await this.collectionService.collectQuestion(
      req.user,
      collectionQuestionDto,
    );
    return {
      code: 200,
      message: '收藏成功',
    };
  }

  /**
   * 取消收藏题目
   */
  @Post('question/cancel')
  async cancelCollectQuestion(
    @Request() req: any,
    @Body('collectionQuestionId') collectionQuestionId: number,
  ): Promise<Result> {
    await this.collectionService.cancelCollectQuestion(
      req.user,
      collectionQuestionId,
    );
    return {
      code: 200,
      message: '取消收藏成功',
    };
  }

  /**
   * 查询当前用户的所有收藏题目
   */
  @Get('question/list')
  async listCollectedQuestion(@Request() req: any): Promise<Result> {
    const collectionQuestions =
      await this.collectionService.listCollectedQuestion(req.user);
    return {
      code: 200,
      message: '查询成功',
      data: collectionQuestions,
    };
  }
}
