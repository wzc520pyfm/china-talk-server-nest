import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateSelectQuestionDto } from './dto/create-select-question.dto';
import { SelectQuestion } from './entities/select-question.entity';
import { QuestionService } from './question.service';
import { CreateNarrateQuestionDto } from './dto/create-narrate-question.dto';
import { NarrateQuestion } from './entities/narrate-question.entity';
import { QueryNarrateQuestionDto } from './dto/query-narrate-question.dto';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /**
   * 查询叙述题
   */
  @Get('/narrates')
  async getQueryNarrateQuestions(@Query() query: QueryNarrateQuestionDto): Promise<Result> {
    const questions = await this.questionService.findNarrateQuestions(query);
    return { code: 200, message: '获取成功', data: { list: questions } };
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
    await this.questionService.createOneSelect(createSelectQuestionDto.words, selectQuestion);
    return { code: 200, message: '创建成功' };
  }

  /**
   * 新增叙述题目
   */
  @Post('/narrate')
  @Roles(Role.ADMIN, Role.TEACHER)
  async createOneNarrateQuestion(
    @Request() req: any,
    @Body() createNarrateQuestionDto: CreateNarrateQuestionDto,
  ): Promise<Result> {
    const narrateQuestion = new NarrateQuestion(createNarrateQuestionDto);
    narrateQuestion.author = req.user;
    narrateQuestion.modifier = req.user;
    const question = await this.questionService.createOneNarrate(
      createNarrateQuestionDto.words,
      narrateQuestion,
    );
    // 新增题目返回新增的题目信息,包括id, 前端再依据问题id上传对应问题的文件资源
    return { code: 200, message: '创建成功', data: { question: question } };
  }

  /**
   * 查询所有题目
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
}
