import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signUpUser } from './types/signup_user';
import { UserService } from 'src/user/user.service';
import { isString } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<signUpUser> {
    const { login, password } = dto;
    if (!login) {
      throw new BadRequestException('required parameter "login" is missing');
    }

    if (!password) {
      throw new BadRequestException('required parameter "password" is missing');
    }

    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userService.createUser({
      login,
      password: hashedPassword,
    });

    const payload = { userId: newUser.id, login: newUser.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return { id: newUser.id, accessToken, refreshToken };
  }

  async signIn(
    dto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = dto;
    if (!login) {
      throw new BadRequestException('required parameter "login" is missing');
    }

    if (!password) {
      throw new BadRequestException('required parameter "password" is missing');
    }

    const existingUser = await this.userService.getUserByLogin(login);

    const payload = { userId: existingUser.id, login: existingUser.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  }

  async refresh(dto: { refreshToken: string }) {
    const { refreshToken } = dto;
    if (!refreshToken || !isString(refreshToken)) {
      throw new UnauthorizedException('Invalid refreshToken value');
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const { userId, login } = decodedToken;

      const existingUser = await this.userService.getUserByLogin(login);

      if (userId !== existingUser.id) {
        throw new ForbiddenException('Refresh token is invalid or expired');
      }

      const payload = { userId: existingUser.id, login: existingUser.login };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      });

      const newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Expired refresh token');
      } else if (error.name === 'JsonWebTokenError') {
        throw new ForbiddenException(`Invalid refresh token - ${error.name}`);
      } else {
        throw new ForbiddenException('Refresh token is invalid or expired');
      }
    }
  }
}
