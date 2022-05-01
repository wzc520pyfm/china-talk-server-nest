import { Module } from '@nestjs/common';
import { AndroidVersionController } from './android-version.controller';
import { AndroidVersionService } from './android-version.service';

@Module({
  controllers: [AndroidVersionController],
  providers: [AndroidVersionService],
})
export class AndroidVersionModule {}
