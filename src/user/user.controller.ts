import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';///src/auth/guard/jwt.guard.js';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: 'Get all users', description: 'Get all users'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'Get single user by id', description: 'Get single user by id'})
  @ApiParam({name: 'userId', required: true})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. userId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'User not found'})
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Create user', description: 'Creates a new user'})
  @ApiResponse({status: HttpStatus.CREATED, description: 'The user has been created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. body does not contain required fields'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async CreateUserDto(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({summary: `Update a user's password`, description: `Updates a user's password by ID`})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.OK, description: 'The user has been updated.'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. userId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: `oldPassword is wrong`})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'User not found'})
  async updateUserPasword(
    @Param('id', ValidationPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPasword(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({summary: `Delete user`, description: `Deletes user by ID.`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'The user has been deleted'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. userId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'User not found'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
