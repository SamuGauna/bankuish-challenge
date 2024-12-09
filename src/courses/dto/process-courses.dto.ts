import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { IsValidCourse } from '../../utils/decorators/validCourse.decorator';

export class CourseItem {
  @ApiProperty({ example: 'PortfolioConstruction' })
  @IsValidCourse({
    message:
      'The desired course name is invalid or conflicts with requiredCourse.',
  })
  desiredCourse: string;

  @ApiProperty({ example: 'PortfolioTheories' })
  @IsValidCourse({
    message:
      'The required course name is invalid or conflicts with desiredCourse.',
  })
  requiredCourse: string;
}

export class ProcessCoursesDto {
  @ApiProperty({
    type: [CourseItem],
    description: 'List of courses with prerequisites',
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one course must be provided.' })
  @ValidateNested({ each: true })
  @Type(() => CourseItem)
  courses: CourseItem[];
}
