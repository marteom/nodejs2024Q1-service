import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { dbModule } from 'src/utils/data/db.module';

@Module({
  imports: [dbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
