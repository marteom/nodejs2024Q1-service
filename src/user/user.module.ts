import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { dbModule } from 'src/utils/data/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  // imports: [dbModule],
  // controllers: [UserController],
  // providers: [UserService],
})
export class UserModule {}
