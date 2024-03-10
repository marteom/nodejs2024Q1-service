import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { usersData } from './data/user.data';
import { createUser, responseUserData, getUser } from './utils/helper.js';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils.js';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return usersData.map(responseUserData);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const user: UserModel = getUser(usersData, id);

    if (user) {
      return response.status(HttpStatus.OK).send(responseUserData(user));
    }

    return response.status(HttpStatus.NOT_FOUND).send('User not found');
  }

  @Post()
  async CreateUserDto(
    @Body() dto: Pick<UserModel, 'login' | 'password'>,
    @Res() response: Response,
  ) {
    if (!dto.login) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "login" is missing');
    }

    if (!dto.password) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "password" is missing');
    }

    const newUser = await createUser(dto.login, dto.password);
    usersData.push(newUser);
    return response.status(HttpStatus.CREATED).send(responseUserData(newUser));
  }

  @Put(':id')
  async updateUserPasword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() response: Response,
  ) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    if (!dto.oldPassword) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "oldPassword" is missing');
    }

    if (!dto.newPassword) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "newPassword" is missing');
    }

    const putedUser = getUser(usersData, id);

    if (!putedUser) {
      return response.status(HttpStatus.NOT_FOUND).send('User not found');
    }

    if (String(putedUser.password) !== String(dto.oldPassword)) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .send('oldPassword is incorrect');
    }

    putedUser.password = dto.newPassword;
    putedUser.version += 1;
    putedUser.updatedAt = Date.now();

    return response.status(HttpStatus.OK).send(responseUserData(putedUser));
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const deletedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === id,
    );

    if (deletedUserIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('User not found');
    }

    usersData.splice(deletedUserIndex, 1);

    return response
      .status(HttpStatus.NO_CONTENT)
      .send('User successfully deleted');
  }
}
