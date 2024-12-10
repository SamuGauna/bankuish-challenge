import { ApiProperty } from '@nestjs/swagger';

export class GetCoursesDto {
  @ApiProperty({ example: 'Course ID' })
  id: string;

  @ApiProperty({ example: 'Course Name' })
  name: string;

  @ApiProperty({ example: null })
  prerequisiteId?: string | null;
}
