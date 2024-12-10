import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    example: 'titovila@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'lala1025.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
