import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Word } from './entities/word.entity';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), CommonModule],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
  exports: [TypeOrmModule, KnowledgeService],
})
export class KnowledgeModule {}
