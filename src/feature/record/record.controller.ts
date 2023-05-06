import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AddWrongQuestion } from './dto/add-wrong-question.dto';
import { SubmitScore } from './dto/submit-score.dto';
import { RecordService } from './record.service';

@Controller('records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  /**
   * 提交成绩
   */
  @Post('/score')
  async submitScore(@Request() req: any, @Body() submitScore: SubmitScore): Promise<Result> {
    await this.recordService.submitScore(req.user, submitScore);
    return {
      code: 200,
      message: '提交成功',
    };
  }

  /**
   * 新增错题
   */
  @Post('/wrong')
  async addWrongQuestion(
    @Request() req: any,
    @Body() addWrongQuestion: AddWrongQuestion,
  ): Promise<Result> {
    await this.recordService.addWrongQuestion(req.user, addWrongQuestion);
    return {
      code: 200,
      message: '提交成功',
    };
  }

  /**
   * 查询当前用户的所有错题
   */
  @Get('/wrong/list')
  async getWrongQuestionList(@Request() req: any): Promise<Result> {
    const result = await this.recordService.getWrongQuestionList(req.user);
    return {
      code: 200,
      message: '查询成功',
      data: { wrong: result },
    };
  }
}
