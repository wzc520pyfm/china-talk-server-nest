import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ExamPaper } from './entities/exam-paper.entity';
import { ScorePaper } from './entities/score-paper.entity';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamPaper, ScorePaper]), CommonModule],
  controllers: [PaperController],
  providers: [PaperService],
  exports: [TypeOrmModule, PaperService],
})
export class PaperModule {}
