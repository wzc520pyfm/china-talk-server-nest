import { IsNumber } from 'class-validator';

export class CollectionQuestionDto {
  @IsNumber()
  questionId: number;
  @IsNumber()
  examPaperId: number;
}
