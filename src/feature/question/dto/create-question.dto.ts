import { PickType } from '@nestjs/mapped-types';
import { Word } from 'src/feature/knowledge/entities/word.entity';
import { Question } from '../entities/question.entity';

export class CreateQuestionDto extends PickType(Question, ['words'] as const) {
  constructor(createWords: Array<Word>) {
    super();
    this.words = createWords;
  }
}
