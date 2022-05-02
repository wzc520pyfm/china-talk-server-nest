import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './entities/word.entity';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
@UseGuards(JwtAuthGuard, RolesGuard)
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  /**
   * 查询所有字词
   */
  @Get('/words')
  async getAllWords(): Promise<Result> {
    const data = await this.knowledgeService.findAllWords();
    return { code: 200, message: '获取成功', data };
  }

  /**
   * 查询指定字词
   */
  @Get('/words/:id')
  async getOneWord(@Param('id') id: number): Promise<Result> {
    const data = await this.knowledgeService.findOneWord(id);
    return { code: 200, message: '获取成功', data };
  }

  /**
   * 创建一个字词
   */
  @Post('/words')
  async createOneWord(
    @Request() req: any,
    @Body() createWordDto: CreateWordDto,
  ): Promise<Result> {
    const word = new Word(createWordDto);
    word.author = req.user;
    word.modifier = req.user;
    await this.knowledgeService.createOneWord(word);
    return { code: 200, message: '创建成功' };
  }
}
