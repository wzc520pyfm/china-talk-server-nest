import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { GradeRecord } from './entities/grade-record.entity';
import { WrongQuestionRecord } from './entities/wrong-question-record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeRecord, WrongQuestionRecord]),
    CommonModule,
  ],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [TypeOrmModule, RecordService],
})
export class RecordModule {}
