import { Module } from '@nestjs/common';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';

@Module({
  controllers: [PaperController],
  providers: [PaperService]
})
export class PaperModule {}
