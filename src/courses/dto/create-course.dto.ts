import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'PortfolioConstruction' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'PortfolioTheories', required: false })
  @IsOptional()
  @IsString()
  prerequisiteName?: string;
}
