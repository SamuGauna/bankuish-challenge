import { ApiProperty } from '@nestjs/swagger';

export class GetCourseDetailDto {
  @ApiProperty({ example: 'Course ID' })
  id: string;

  @ApiProperty({ example: 'Course Name' })
  name: string;

  @ApiProperty({ example: null })
  prerequisiteId?: string | null;
}
