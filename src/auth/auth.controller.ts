import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { FirebaseClientService } from '../firebase/firebase-client/firebase-client.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apiResponseWrapper } from '../utils/factories/apiResponseWrapper.factory';
import { ErrorResponseDto } from '../utils/dto/error.dto';
import { apiErrorWrapper } from '../utils/factories/apiErrorWrapper.factory';

@ApiTags('Auth login client')
@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseClientService: FirebaseClientService) {}

  @ApiOperation({ summary: 'Login client to get token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper({}),
    description: 'Login success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.firebaseClientService.login(email, password);
    return res;
  }
}
