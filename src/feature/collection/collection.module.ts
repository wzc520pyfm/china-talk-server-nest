import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { PaperModule } from '../paper/paper.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionQuestion } from './entities/collection-question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionQuestion]),
    PaperModule,
    CommonModule,
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [TypeOrmModule, CollectionService],
})
export class CollectionModule {}
