import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';

@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: 'Get all favorites', description: 'Gets all favorites movies, tracks and books'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async getAllFavorites() {
    return this.favoriteService.getAllFavorites();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/track/:id')
  @ApiOperation({summary: 'Add track to the favorites', description: 'Add track to the favorites'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Added successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. trackId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.UNPROCESSABLE_ENTITY, description: `Track with id doesn't exist.`})
  async addTrackToFavorites(@Param('id') trackId: string) {
    return this.favoriteService.addTrackToFavorites(trackId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/track/:id')
  @ApiOperation({summary: `Delete track from favorites`, description: `Delete track from favorites`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. trackId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Track was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTrackFavoritesById(@Param('id') trackId: string) {
      return this.favoriteService.deleteTrackFavoritesById(trackId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/album/:id')
  @ApiOperation({summary: 'Add album to the favorites', description: 'Add album to the favorites'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Added successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. albumId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.UNPROCESSABLE_ENTITY, description: `Album with id doesn't exist.`})
    async addAlbumToFavorites(@Param('id') albumId: string) {
      return this.favoriteService.addAlbumToFavorites(albumId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/album/:id')
  @ApiOperation({summary: `Delete album from favorites`, description: `Delete album from favorites`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. albumId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Album was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAlbumFavoritesById(@Param('id') albumId: string) {
      return this.favoriteService.deleteAlbumFavoritesById(albumId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/artist/:id')
  @ApiOperation({summary: 'Add artist to the favorites', description: 'Add artist to the favorites'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Added successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. artistId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.UNPROCESSABLE_ENTITY, description: `Artist with id doesn't exist.`})
    async addArtistToFavorites(@Param('id') artistId: string) {
      return this.favoriteService.addArtistToFavorites(artistId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/artist/:id')
  @ApiOperation({summary: `Delete artist from favorites`, description: `Delete artist from favorites`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad. artistId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Artist was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
    async deleteArtistFavoritesById(@Param('id') artistId: string) {
      return this.favoriteService.deleteArtistFavoritesById(artistId);
  }
}
