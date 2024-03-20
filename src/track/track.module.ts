import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { dbModule } from 'src/utils/data/db.module';

@Module({
  imports: [dbModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
