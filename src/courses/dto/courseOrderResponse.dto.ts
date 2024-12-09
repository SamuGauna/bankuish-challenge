import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CourseOrderResponseDto {
  @ApiProperty({ example: 'Investment' })
  @IsString()
  course: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;
}
