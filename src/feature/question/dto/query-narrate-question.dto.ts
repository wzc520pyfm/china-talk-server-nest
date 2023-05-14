import { PickType } from '@nestjs/mapped-types';
import { NarrateQuestion } from '../entities/narrate-question.entity';

export class QueryNarrateQuestionDto extends PickType(NarrateQuestion, [
  'questionClassification',
  'questionDifficulty',
] as const) {}
