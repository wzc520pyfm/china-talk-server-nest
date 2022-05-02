import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateSelectQuestionDto } from './dto/create-select-question.dto';
import { SelectQuestion } from './entities/select-question.entity';
import { QuestionService } from './question.service';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /**
   * 查询所有选择题
   */
  @Get('/')
  async getAllQuestions(): Promise<Result> {
    const questions = await this.questionService.findAll();
    return { code: 200, message: '获取成功', data: { questions: questions } };
  }

  /**
   * 查询指定id的题目
   * @param id 题目id
   */
  @Get('/:id')
  async getOneQuestion(@Param('id') id: number): Promise<Result> {
    const question = await this.questionService.findOne(id);
    return { code: 200, message: '获取成功', data: { question: question } };
  }

  /**
   * 新建选择题
   */
  @Post('/select')
  @Roles(Role.ADMIN, Role.TEACHER)
  async createOneSelectQuestion(
    @Request() req: any,
    @Body() createSelectQuestionDto: CreateSelectQuestionDto,
  ): Promise<Result> {
    const selectQuestion = new SelectQuestion(createSelectQuestionDto);
    selectQuestion.author = req.user;
    selectQuestion.modifier = req.user;
    await this.questionService.createOneSelect(
      createSelectQuestionDto.words,
      selectQuestion,
    );
    return { code: 200, message: '创建成功' };
  }
}
