import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { ContentResources } from './entities/content-resources.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(ContentResources)
    private contentResourcesRepository: Repository<ContentResources>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private connection: Connection,
  ) {}

  async createOneContentResources(questionId: number, contentResources: ContentResources) {
    const question = await this.questionsRepository.findOne({ where: { id: questionId } });
    contentResources.question = question;
    await this.contentResourcesRepository.save(contentResources);
  }
}
