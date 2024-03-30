import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({description: `The user's login`})
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({description: `The user's password`})
  @IsNotEmpty()
  @IsString()
  password: string;
}
