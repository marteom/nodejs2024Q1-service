import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { dbModule } from 'src/utils/data/db.module';

@Module({
  imports: [dbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
