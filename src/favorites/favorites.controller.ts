import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async getAllFavorites() {
    return this.favoriteService.getAllFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param('id') trackId: string,) {
    return this.favoriteService.addTrackToFavorites(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTrackFavoritesById(@Param('id') trackId: string) {
      return this.favoriteService.deleteTrackFavoritesById(trackId);
  }

  @Post('/album/:id')
    async addAlbumToFavorites(@Param('id') albumId: string) {
      return this.favoriteService.addAlbumToFavorites(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAlbumFavoritesById(@Param('id') albumId: string) {
      return this.favoriteService.deleteAlbumFavoritesById(albumId);
  }

   @Post('/artist/:id')
    async addArtistToFavorites(@Param('id') artistId: string) {
      return this.favoriteService.addArtistToFavorites(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteArtistFavoritesById(@Param('id') artistId: string) {
      return this.favoriteService.deleteArtistFavoritesById(artistId);
  }
}
