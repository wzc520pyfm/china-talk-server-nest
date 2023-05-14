import { FileResource } from './entities/file-resources.entity';
import {
  Body,
  Controller,
  Request,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Result } from 'src/common/interfaces/result.interface';
import { UpLoadFileDto } from './dto/up-load-file.dto';
import { QuestionOfResourceDto } from './dto/question-of-resource.dto';
import { FileService } from './file.service';
import { ContentResources } from './entities/content-resources.entity';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('file')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}
  /**
   * 文件上传的demo接口
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('defaultFile'))
  async UploadedFile(
    @Body() body: UpLoadFileDto, // 如果需要获取body里除文件外的其他数据
    @UploadedFile() file: Express.Multer.File, // 获取上传的文件
  ): Promise<Result> {
    return { code: 200, message: '上传成功', data: { file } };
  }

  /**
   * 创建某一问题的内容静态资源
   */
  @Post('content')
  @UseInterceptors(FileInterceptor('image'))
  async createOneContentResources(
    @Request() req: any,
    @Body() question: QuestionOfResourceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Result> {
    const fileResource = new FileResource({
      name: file.filename,
      originalname: file.originalname,
      path: file.path.split('client\\')[1],
      size: file.size,
      type: file.mimetype,
      user: req.user,
    });
    const contentResources = new ContentResources({
      fileResource,
    });
    await this.fileService.createOneContentResources(question.questionId, contentResources);
    return { code: 200, message: '创建成功' };
  }
}
