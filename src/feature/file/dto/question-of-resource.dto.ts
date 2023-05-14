import { IsNotEmpty } from 'class-validator';

export class QuestionOfResourceDto {
  @IsNotEmpty()
  questionId: number;
}
