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
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DrawingDto } from './drawings.dto';

@ApiTags('Drawings')
@Controller('api/drawings')
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    example: 25,
  })
  @ApiResponse({ status: 200, description: 'string' })
  @ApiResponse({ status: 422, description: 'Validation Error' })
  @Get('get')
  @ApiOperation({ summary: 'Get Drawings' })
  findWithOffsetAndLimit(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 25,
  ): Promise<Drawings[]> {
    return this.drawingsService.findWithOffsetAndLimit(offset, limit);
  }

  @Post('create')
  @ApiBody({
    type: DrawingDto,
  })
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Drawing' })
  create(@Body('drawing') drawing: string): Promise<Drawings> {
    if (!drawing) {
      throw new HttpException(
        'Problem with drawing data',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.drawingsService.create(drawing);
  }
}
