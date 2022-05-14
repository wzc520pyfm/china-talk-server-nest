import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { PaperService } from './paper.service';

@Controller('papers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  /**
   * 随机生成一份试卷
   */
  @Post('/randomOne')
  async createRandomOne(@Request() req: any): Promise<Result> {
    const examPaper = await this.paperService.createRandomOne(req.user);
    return {
      code: 200,
      message: '试卷创建成功',
      data: { examPaperId: examPaper.id },
    };
  }

  /**
   * 查询所有试卷
   */
  @Get('/all')
  async findAll(): Promise<Result> {
    const papers = await this.paperService.findAll();
    return {
      code: 200,
      message: '查询成功',
      data: { papers },
    };
  }

  /**
   * 查询指定id的试卷
   */
  @Get('/paper/:id')
  async findOne(@Param('id') id: number): Promise<Result> {
    const paper = await this.paperService.findOne(id);
    return {
      code: 200,
      message: '查询成功',
      data: { paper },
    };
  }

  /**
   * 查询所有HSK模拟试卷
   */
  @Get('hskmocks')
  async findAllHskMocks(): Promise<Result> {
    const papers = await this.paperService.findAllHskMocks();
    return {
      code: 200,
      message: '查询成功',
      data: { papers },
    };
  }

  /**
   * 询当前用户做过的所有HSK模拟试卷并携带当前用户答题记录的最高分
   */
  @Get('hskmocks/with-user-score')
  async findAllHskMocksWithUserScore(@Request() req: any): Promise<Result> {
    const papers = await this.paperService.findAllHskMocksWithUserScore(
      req.user,
    );
    return {
      code: 200,
      message: '查询成功',
      data: { papers },
    };
  }

  /**
   * 查询所有HSK模拟试卷并且携带当前用户答题记录的最高分
   */
  @Get('hskmocks/with-user-score/all')
  async findAllHskMocksWithUserScoreAll(@Request() req: any): Promise<Result> {
    const papers = await this.paperService.findAllHskMocksWidthUserScoreAll(
      req.user,
    );
    return {
      code: 200,
      message: '查询成功',
      data: { papers },
    };
  }
}
