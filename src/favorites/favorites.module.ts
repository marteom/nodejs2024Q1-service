import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { dbModule } from 'src/utils/data/db.module';

@Module({
  imports: [dbModule],
  controllers: [FavoritesController],
  providers: [FavoriteService],
})
export class FavoritesModule {}
