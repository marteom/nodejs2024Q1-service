import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { responseUserData } from './utils/helper.js';
import { isIdValid } from '../utils/common-utils'
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return (await this.userRepository.find()).map(responseUserData);
  }

  async getUserById(id: string): Promise<UserEntity> {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return responseUserData(user);
  }

  async createUser(dto: Pick<UserModel, 'login' | 'password'>): Promise<UserEntity> {
    const { login, password } = dto;
    if (!login) {
      throw new BadRequestException('required parameter "login" is missing');
    }

    if (!password) {
      throw new BadRequestException('required parameter "password" is missing');
    }
    const newUser = this.userRepository.create({
      login,
      password,
    });
    await this.userRepository.save(newUser);

    return responseUserData(newUser);
  }

  async updateUserPasword(id: string, dto: UpdatePasswordDto): Promise<UserEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    if (!dto.oldPassword) {
      throw new BadRequestException('required parameter "oldPassword" is missing');
    }

    if (!dto.newPassword) {
      throw new BadRequestException('required parameter "newPassword" is missing');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (String(user.password) !== String(dto.oldPassword)) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = dto.newPassword;
    user.version += 1;
    await this.userRepository.save(user);

    return responseUserData(user);
  }

  async deleteUserById(id: string) {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
    return user;
  }
}
