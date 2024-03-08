import { Module } from '@nestjs/common';
import { dbService } from './db.service';

@Module({
  providers: [dbService],
  exports: [dbService],
})
export class dbModule {}