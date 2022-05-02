import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AndroidVersionController } from './android-version.controller';
import { AndroidVersionService } from './android-version.service';
import { AndroidVersion } from './entities/android-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AndroidVersion]), CommonModule],
  controllers: [AndroidVersionController],
  providers: [AndroidVersionService],
  exports: [TypeOrmModule, AndroidVersionService],
})
export class AndroidVersionModule {}
