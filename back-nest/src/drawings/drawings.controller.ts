import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DrawingsService } from './drawings.service';
import { Drawings } from './drawings.entity';

@Controller('api/drawings')
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Get('get')
  findWithOffsetAndLimit(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Drawings[]> {
    return this.drawingsService.findWithOffsetAndLimit(offset, limit);
  }

  @Post('create')
  @HttpCode(201)
  create(@Body('drawing') drawing: string) {
    if (!drawing) {
      throw new HttpException(
        'Problem with drawing data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.drawingsService.create(drawing);
  }
}
