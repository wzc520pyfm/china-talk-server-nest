import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ExamPaper } from '../paper/entities/exam-paper.entity';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { AddWrongQuestion } from './dto/add-wrong-question.dto';
import { SubmitScore } from './dto/submit-score.dto';
import { GradeRecord } from './entities/grade-record.entity';
import { WrongQuestionRecord } from './entities/wrong-question-record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(GradeRecord)
    private readonly gradeRecordRepository: Repository<GradeRecord>,
    @InjectRepository(WrongQuestionRecord)
    private readonly wrongQuestionRecordRepository: Repository<WrongQuestionRecord>,
    @InjectRepository(ExamPaper)
    private readonly examPaperRepository: Repository<ExamPaper>,
    private connection: Connection,
  ) {}
  /**
   * 提交成绩
   */
  async submitScore(user: User, submitScore: SubmitScore): Promise<void> {
    const examPaper = await this.examPaperRepository.findOneBy({
      id: submitScore.examPaperId,
    });
    if (!examPaper) {
      throw new Error('试卷不存在');
    }
    let gradeRecord: GradeRecord;
    gradeRecord = await this.gradeRecordRepository.findOneBy({
      examPaper: { id: submitScore.examPaperId },
      user: { id: user.id },
    });
    if (!gradeRecord) {
      gradeRecord = new GradeRecord();
      gradeRecord.examPaper = examPaper;
      gradeRecord.user = user;
    }
    gradeRecord.score = submitScore.score;
    await this.gradeRecordRepository.save(gradeRecord);
  }

  /**
   * 新增错题
   */
  async addWrongQuestion(
    user: User,
    addWrongQuestion: AddWrongQuestion,
  ): Promise<void> {
    const examPaper = await this.examPaperRepository.findOneBy({
      id: addWrongQuestion.examPaperId,
    });
    if (!examPaper) {
      throw new Error('试卷不存在');
    }
    let wrongQuestionRecord: WrongQuestionRecord;
    wrongQuestionRecord = await this.wrongQuestionRecordRepository.findOneBy({
      user: { id: user.id },
      question: { id: addWrongQuestion.questionId },
    });
    if (!wrongQuestionRecord) {
      wrongQuestionRecord = new WrongQuestionRecord();
      wrongQuestionRecord.examPaper = examPaper;
      wrongQuestionRecord.user = user;
      wrongQuestionRecord.question = new Question({
        id: addWrongQuestion.questionId,
      });
    }
    wrongQuestionRecord.lastWrongAnswer = addWrongQuestion.lastWrongAnswer;
    await this.wrongQuestionRecordRepository.save(wrongQuestionRecord);
  }

  /**
   * 查询当前用户的所有错题
   */
  async getWrongQuestionList(user: User): Promise<Array<WrongQuestionRecord>> {
    const wrongQuestionRecords = await this.wrongQuestionRecordRepository.find({
      where: { user: { id: user.id } },
      relations: ['question'],
    });
    return wrongQuestionRecords;
  }
}
