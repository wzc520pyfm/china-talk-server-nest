import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from 'src/common/enums/mark.enum';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { State } from 'src/common/enums/state.enum';
import { Connection, Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { ExamPaper } from './entities/exam-paper.entity';
import { ScorePaper } from './entities/score-paper.entity';

@Injectable()
export class PaperService {
  constructor(
    @InjectRepository(ExamPaper)
    private readonly examPaperRepository: Repository<ExamPaper>,
    @InjectRepository(ScorePaper)
    private readonly scorePaperRepository: Repository<ScorePaper>,
    private connection: Connection,
  ) {}

  /**
   * 随机生成试卷
   */
  async createRandomOne(user: User): Promise<ExamPaper> {
    const examPaper = new ExamPaper({});
    const scorePapers: Array<ScorePaper> = Array<ScorePaper>();
    examPaper.name = '随机模拟试卷';
    examPaper.description = '随机生成一份模拟试卷';
    examPaper.type = QuestionClassification.HSK_MOCK;
    examPaper.status = State.ENABLE;
    examPaper.creator = user;
    examPaper.modifier = user;
    for (let i = 0; i < 10; i++) {
      const scorePaper = new ScorePaper({});
      scorePaper.score = 10;
      scorePaper.question = new Question({
        id: i + 4 /** //TODO 随机4~16 */,
      });
      scorePaper.creator = user;
      scorePaper.modifier = user;
      scorePapers.push(scorePaper);
    }
    examPaper.scorePapers = scorePapers;
    const result = await this.examPaperRepository.save(examPaper);
    const scorePapersSave = [];
    for (const scorePaper of result.scorePapers) {
      scorePaper.examPaper = result;
      scorePapersSave.push(this.scorePaperRepository.save(scorePaper));
    }
    await Promise.all(scorePapersSave);
    return result;
  }

  async findAll(): Promise<Array<ExamPaper>> {
    return await this.examPaperRepository.find();
  }

  async findOne(id: number): Promise<ExamPaper> {
    return await this.examPaperRepository
      .createQueryBuilder('exam_paper')
      .leftJoinAndSelect('exam_paper.scorePapers', 'score_paper') // 第一个参数为要加载的关系, 第二个字段是为此关系的表分配的别名
      .leftJoinAndSelect('exam_paper.creator', 'creator')
      .leftJoinAndSelect('exam_paper.modifier', 'modifier')
      .leftJoinAndSelect('score_paper.question', 'question')
      .leftJoinAndSelect('question.selectQuestion', 'select_question')
      .leftJoinAndSelect('question.judgmentQuestion', 'judgement_question')
      .leftJoinAndSelect('question.narrateQuestion', 'narrate_question')
      .where('exam_paper.id = :id', { id })
      .andWhere('exam_paper.actionRecords.mark = :mark', { mark: Mark.NORMAL })
      .select([
        // 自定义返回字段
        'exam_paper.id',
        'exam_paper.name',
        'exam_paper.description',
        'exam_paper.type',
        'exam_paper.status',
        'exam_paper.actionRecords.updateTime',
        'score_paper.id',
        'score_paper.score',
        'question.id',
        'select_question.id',
        'judgement_question.id',
        'narrate_question.id',
        'creator.id',
        'creator.username',
        'modifier.id',
        'modifier.username',
      ])
      .getOne();
  }

  async findAllHskMocks(): Promise<Array<ExamPaper>> {
    return await this.examPaperRepository.find({
      where: {
        type: QuestionClassification.HSK_MOCK,
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
    });
  }
}
