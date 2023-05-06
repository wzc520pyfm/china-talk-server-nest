import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from 'src/common/enums/mark.enum';
import { Connection, Repository } from 'typeorm';
import { Word } from '../knowledge/entities/word.entity';
import { Question } from './entities/question.entity';
import { SelectQuestion } from './entities/select-question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(SelectQuestion)
    private selectQuestionsRepository: Repository<SelectQuestion>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<Array<Question>> {
    return await this.questionsRepository.find({
      where: {
        actionRecords: {
          mark: Mark.NORMAL,
        },
      },
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
      relations: ['selectQuestion', 'judgmentQuestion', 'narrateQuestion', 'words'],
    });
    if (!result) throw new Error('没有找到该题目');
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
}
