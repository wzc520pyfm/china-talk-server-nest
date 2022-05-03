import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ExamPaper } from '../paper/entities/exam-paper.entity';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { CollectionQuestionDto } from './dto/create-collection-question.dto';
import { CollectionQuestion } from './entities/collection-question.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionQuestion)
    private readonly collectionQuestionRepository: Repository<CollectionQuestion>,
    @InjectRepository(ExamPaper)
    private readonly examPaperRepository: Repository<ExamPaper>,
    private connection: Connection,
  ) {}

  /**
   * 收藏题目
   */
  async collectQuestion(
    user: User,
    collectionQuestionDto: CollectionQuestionDto,
  ): Promise<void> {
    const examPaper = await this.examPaperRepository.findOneBy({
      id: collectionQuestionDto.examPaperId,
    });
    if (!examPaper) {
      throw new Error('试卷不存在');
    }
    let collectionQuestion: CollectionQuestion;
    collectionQuestion = await this.collectionQuestionRepository.findOneBy({
      user: { id: user.id },
      question: { id: collectionQuestionDto.questionId },
    });
    if (!collectionQuestion) {
      collectionQuestion = new CollectionQuestion({});
      collectionQuestion.user = user;
      collectionQuestion.question = new Question({
        id: collectionQuestionDto.questionId,
      });
    }
    collectionQuestion.examPaper = examPaper;
    await this.collectionQuestionRepository.save(collectionQuestion);
  }

  /**
   * 取消收藏题目
   */
  async cancelCollectQuestion(user: User, collectionQuestionId: number) {
    return await this.collectionQuestionRepository.delete(collectionQuestionId);
  }

  /**
   * 查询当前用户的所有收藏题目
   */
  async listCollectedQuestion(user: User) {
    return await this.collectionQuestionRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['question', 'examPaper'],
    });
  }
}
