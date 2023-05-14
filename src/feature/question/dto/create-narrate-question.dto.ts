import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsString, ValidateIf } from 'class-validator';
import { NarrateQuestion } from '../entities/narrate-question.entity';
import { CreateQuestionDto } from './create-question.dto';

class CreateNarrateQuestion extends PickType(NarrateQuestion, [
  'questionClassification',
  'questionDifficulty',
  'content',
  'answer',
] as const) {
  @IsString()
  @ValidateIf((o) => o?.role)
  tip?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  analysis?: string;
}
export class CreateNarrateQuestionDto extends IntersectionType(
  CreateQuestionDto,
  CreateNarrateQuestion,
) {}
