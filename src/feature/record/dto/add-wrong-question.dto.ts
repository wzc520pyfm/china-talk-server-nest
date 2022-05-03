import { IsNumber, IsString } from 'class-validator';

export class AddWrongQuestion {
  @IsNumber()
  examPaperId: number;
  @IsString()
  lastWrongAnswer: string;
  @IsNumber()
  questionId: number;
}
