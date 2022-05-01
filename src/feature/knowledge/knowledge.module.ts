import { Module } from '@nestjs/common';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

@Module({
  controllers: [KnowledgeController],
  providers: [KnowledgeService]
})
export class KnowledgeModule {}
