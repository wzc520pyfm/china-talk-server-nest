import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Mark } from 'src/common/enums/mark.enum';
import { QuestionClassification } from 'src/common/enums/question-classification.enum';
import { State } from 'src/common/enums/state.enum';
import { Connection, Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { GradeRecord } from '../record/entities/grade-record.entity';
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
    examPaper.timeLimit = 60;
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
    examPaper.total = 10;
    examPaper.totalScore = 10 * 10;
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

  /**
   * 查询所有试卷
   */
  async findAll(): Promise<Array<ExamPaper>> {
    return await this.examPaperRepository.find();
  }

  /**
   * 查询指定id的试卷
   */
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

  /**
   * 查询所有HSK模拟试卷
   */
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

  /**
   * 查询当前用户做过的所有HSK模拟试卷并携带当前用户答题记录的最高分
   */
  async findAllHskMocksWithUserScore(user: User): Promise<Array<ExamPaper>> {
    return await this.examPaperRepository.find({
      where: {
        type: QuestionClassification.HSK_MOCK,
        actionRecords: {
          mark: Mark.NORMAL,
        },
        gradeRecords: {
          user: { id: user.id },
        },
      },
      relations: ['gradeRecords'],
    });
  }

  /**
   * 查询所有HSK模拟试卷并且携带当前用户答题记录的最高分
   */
  async findAllHskMocksWidthUserScoreAll(
    user: User,
  ): Promise<Array<ExamPaper>> {
    const result = await this.examPaperRepository.find({
      where: {
        type: QuestionClassification.HSK_MOCK,
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
      relations: ['gradeRecords', 'gradeRecords.user'],
      select: [
        'id',
        'name',
        'description',
        'type',
        'total',
        'timeLimit',
        'totalScore',
      ],
    });
    // 对查询结果进行过滤, 试卷成绩只记录当前用户的最高分, 不返回其他用户的答题分数记录
    await Promise.all(
      result.map((item) => {
        let fag = false;
        for (let i = 0; i < item.gradeRecords.length; i++) {
          if (item.gradeRecords[i].user.id === user.id) {
            item.gradeRecords = [item.gradeRecords[i]];
            item.gradeRecords = [
              omit(item.gradeRecords[0], [
                'user',
                'actionRecords',
              ]) as GradeRecord,
            ];
            fag = true;
            break;
          }
        }
        if (!fag) {
          item.gradeRecords = [];
        }
        return item;
      }),
    );
    return result;
  }
}
