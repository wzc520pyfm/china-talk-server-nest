import { PickType } from '@nestjs/mapped-types';
import { IsString, ValidateIf } from 'class-validator';
import { Word } from '../entities/word.entity';

export class CreateWordDto extends PickType(Word, ['word', 'pinyin'] as const) {
  @IsString()
  @ValidateIf((o) => o?.role)
  phonetic: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  explain: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  explainEn: string;

  @IsString()
  @ValidateIf((o) => o?.role)
  sentence: string;
}
