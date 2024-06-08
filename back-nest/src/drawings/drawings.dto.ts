import { ApiProperty } from '@nestjs/swagger';

export class DrawingDto {
  @ApiProperty({
    example: [{}],
    required: true,
  })
  drawing: string;
}
