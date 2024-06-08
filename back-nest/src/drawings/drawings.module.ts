import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrawingsService } from './drawings.service';
import { DrawingsController } from './drawings.controller';
import { Drawings } from './drawings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drawings])],
  providers: [DrawingsService],
  controllers: [DrawingsController],
})
export class DrawingsModule {}
