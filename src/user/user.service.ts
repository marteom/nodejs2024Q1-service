import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { responseUserData } from './utils/helper.js';
import { isIdValid } from '../utils/common-utils'
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { dbService } from 'src/utils/data/db.service';

@Injectable()
export class UserService {

  @Inject(dbService)
  private readonly databaseService: dbService;

  async getAllUsers() {
    return (await this.databaseService.getAllUsers()).map(responseUserData);
  }

  async getUserById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.databaseService.getUserById(id);

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

    const newUser = await this.databaseService.createUser(dto.login, dto.password);

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

    const putedUser = await this.databaseService.getUserById(id);

    if (!putedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (String(putedUser.password) !== String(dto.oldPassword)) {
      throw new HttpException('oldPassword is incorrect', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.databaseService.updateUserPasword(id, dto.newPassword);

    return responseUserData(updatedUser);
  }

  async deleteUserById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedUser = await this.databaseService.deleteUserById(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
