import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/application/service/user/user.service';
import { CreateUserRequest } from './request';
import { CreateUserResponse } from './response';

@Controller('users')
export class UserController {
  public constructor(public readonly userService: UserService) {}

  @Post()
  public async create(
    @Body() body: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return this.userService
      .create(body.toUsecaseArgs())
      .then(CreateUserResponse.fromEntity);
  }
}
