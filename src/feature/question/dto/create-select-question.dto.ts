import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsString, ValidateIf } from 'class-validator';
import { SelectQuestion } from '../entities/select-question.entity';
import { CreateQuestionDto } from './create-question.dto';

class CreateSelectQuestion extends PickType(SelectQuestion, [
  'questionClassification',
  'questionDifficulty',
  'content',
  'option1',
  'option2',
  'answer',
] as const) {
  @IsString()
  @ValidateIf((o) => o?.role)
  option3?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  option4?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  option5?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  option6?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  tip?: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  analysis?: string;
}
export class CreateSelectQuestionDto extends IntersectionType(
  CreateQuestionDto,
  CreateSelectQuestion,
) {}
