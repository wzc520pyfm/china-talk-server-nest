import { IsNumber } from 'class-validator';

export class SubmitScore {
  @IsNumber()
  examPaperId: number;

  @IsNumber()
  score: number;
}
