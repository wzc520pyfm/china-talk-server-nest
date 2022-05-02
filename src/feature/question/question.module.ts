import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { JudgmentQuestion } from './entities/judgment-question.entity';
import { NarrateQuestion } from './entities/narrate-question.entity';
import { Question } from './entities/question.entity';
import { SelectQuestion } from './entities/select-question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      JudgmentQuestion,
      NarrateQuestion,
      SelectQuestion,
    ]),
    CommonModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [TypeOrmModule, QuestionService],
})
export class QuestionModule {}
