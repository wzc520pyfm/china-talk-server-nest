import { Question } from 'src/feature/question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FileResource } from './file-resources.entity';

/**
 * 题目资源文件
 */
@Entity({
  name: 'content_resources',
  orderBy: {
    id: 'ASC',
  },
})
export class ContentResources {
  @Column((type) => FileResource)
  fileResource: FileResource;

  // 问题记录
  @ManyToOne((type) => Question, (question) => question.contentResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  question: Question;
}
