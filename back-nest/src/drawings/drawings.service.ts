import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drawings } from './drawings.entity';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectRepository(Drawings)
    private drawingsRepository: Repository<Drawings>,
  ) {}

  async findWithOffsetAndLimit(
    offset?: number,
    limit?: number,
  ): Promise<Drawings[]> {
    return await this.drawingsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async create(draw: string) {
    const drawing = new Drawings();
    drawing.drawing = JSON.stringify(draw);

    return await this.drawingsRepository.save(drawing);
  }
}
