import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { usersData } from './data/user.data';
import { createUser, getUser, responseUserData } from './utils/helper';
import { isIdValid } from 'src/utils/common-utils';
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  async getAllUsers() {
    return usersData.map(responseUserData);
  }

  async getUserById(userId: string) {
    if (!(await isIdValid(userId))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: UserModel = getUser(usersData, userId);

    if (user) {
      return responseUserData(user);
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(dto: Pick<UserModel, 'login' | 'password'>) {
    if (!dto.login) {
      throw new HttpException(
        'required parameter "login" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.password) {
      throw new HttpException(
        'required parameter "password" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await createUser(dto.login, dto.password);
    usersData.push(newUser);

    return responseUserData(newUser);
  }

  async updateUserPasword(id: string, dto: UpdatePasswordDto) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.oldPassword) {
      throw new HttpException(
        'required parameter "oldPassword" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.newPassword) {
      throw new HttpException(
        'required parameter "newPassword" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const putedUser = getUser(usersData, id);

    if (!putedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (String(putedUser.password) !== String(dto.oldPassword)) {
      throw new HttpException('oldPassword is incorrect', HttpStatus.FORBIDDEN);
    }

    putedUser.password = dto.newPassword;
    putedUser.version += 1;
    putedUser.updatedAt = Date.now();

    return responseUserData(putedUser);
  }

  async deleteUserById(userId: string) {
    if (!(await isIdValid(userId))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === userId,
    );

    if (deletedUserIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return usersData.splice(deletedUserIndex, 1);
  }
}
