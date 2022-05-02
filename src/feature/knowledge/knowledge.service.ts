import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Word } from './entities/word.entity';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
    private connection: Connection,
  ) {}

  async findAllWords(): Promise<Array<Word>> {
    return await this.wordsRepository.find();
  }

  async findOneWord(id: number): Promise<Word | undefined> {
    return await this.wordsRepository.findOneBy({ id });
  }

  async createOneWord(word: Word): Promise<void> {
    await this.wordsRepository.save(word);
  }
}
