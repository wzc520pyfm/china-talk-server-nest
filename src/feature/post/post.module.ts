import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommonModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [TypeOrmModule, PostService],
})
export class PostModule {}
