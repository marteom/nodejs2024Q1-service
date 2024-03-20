import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { dbModule } from 'src/utils/data/db.module';

@Module({
  imports: [dbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
