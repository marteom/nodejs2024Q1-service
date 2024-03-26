import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavoritesController],
  providers: [FavoriteService],
})
export class FavoritesModule {}
