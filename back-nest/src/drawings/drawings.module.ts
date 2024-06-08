import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrawingsController } from './drawings.controller';
import { Drawings } from './drawings.entity';
import { DrawingsService } from './drawings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Drawings])],
  providers: [DrawingsService],
  controllers: [DrawingsController],
})
export class DrawingsModule {}
