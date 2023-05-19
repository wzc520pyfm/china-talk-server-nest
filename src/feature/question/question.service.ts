import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from 'src/common/enums/mark.enum';
import { Connection, Repository } from 'typeorm';
import { Word } from '../knowledge/entities/word.entity';
import { Question } from './entities/question.entity';
import { SelectQuestion } from './entities/select-question.entity';
import { NarrateQuestion } from './entities/narrate-question.entity';
import { QueryNarrateQuestionDto } from './dto/query-narrate-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(SelectQuestion)
    private selectQuestionsRepository: Repository<SelectQuestion>,
    @InjectRepository(NarrateQuestion)
    private narrateQuestionRepository: Repository<NarrateQuestion>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Array<Question>> {
    return await this.questionsRepository.find({
      where: {
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
      relations: ['selectQuestion', 'judgmentQuestion', 'narrateQuestion'],
    });
  }

  async findOne(id: number): Promise<Question> {
    const result = await this.questionsRepository.findOne({
      where: {
        id,
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
      relations: [
        'selectQuestion',
        'judgmentQuestion',
        'narrateQuestion',
        'words',
        'contentResources',
      ],
    });
    if (!result) throw new Error('没有找到该题目');
    return result;
  }

  async findNarrateQuestions(query: QueryNarrateQuestionDto) {
    const result = await this.questionsRepository.find({
      where: {
        narrateQuestion: {
          questionClassification: query.questionClassification,
          questionDifficulty: query.questionDifficulty,
        },
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
      relations: ['narrateQuestion', 'words', 'contentResources'],
    });
    return result;
  }

  /**
   * 创建一道选择题
   * @param words 选择题的词条
   * @param selectQuestion 选择题的内容
   */
  async createOneSelect(words: Array<Word>, selectQuestion: SelectQuestion): Promise<void> {
    const question = new Question({});
    question.selectQuestion = selectQuestion;
    question.words = words;
    await this.selectQuestionsRepository.save(selectQuestion);
    await this.questionsRepository.save(question);
  }

  /**
   * 创建一道叙述题
   * @param words 叙述题的词条
   * @param selectQuestion 叙述题的内容
   */
  async createOneNarrate(words: Array<Word>, narrateQuestion: NarrateQuestion): Promise<Question> {
    const question = new Question({});
    question.narrateQuestion = narrateQuestion;
    question.words = words;
    await this.narrateQuestionRepository.save(narrateQuestion);
    const result = await this.questionsRepository.save(question);
    return result;
  }
}
