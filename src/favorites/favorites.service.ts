import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isIdValid } from 'src/utils/common-utils';
import { dbService } from 'src/utils/data/db.service';

@Injectable()
export class FavoriteService {

  @Inject(dbService)
  private readonly databaseService: dbService;


  async getAllFavorites() {
    return this.databaseService.getAllFavorites();
  }

  async addTrackToFavorites(trackId: string) {
    if (
      trackId === undefined ||
      !(trackId === null ? true : await isIdValid(trackId))
    ) {
        throw new HttpException(
            'required parameter "trackId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const track = await this.databaseService.addTrackToFavorites(trackId);
    if (!track) {
        throw new HttpException(
            'Track does not exist',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return track;
  }

  async deleteTrackFavoritesById(trackId: string) {
    if (
      trackId === undefined ||
      !(trackId === null ? true : await isIdValid(trackId))
    ) {
        throw new HttpException(
            'required parameter "trackId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const track = await this.databaseService.deleteTrackFavoritesById(trackId);
    if (!track) {
        throw new HttpException(
            'Track does not exist',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return track;
  }

  async addAlbumToFavorites(albumId: string) {
    if (
      albumId === undefined ||
      !(albumId === null ? true : await isIdValid(albumId))
    ) {
        throw new HttpException(
            'required parameter "albumId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const album = await this.databaseService.addAlbumToFavorites(albumId);
    if (!album) {
        throw new HttpException(
            'Album does not exist',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return album;
  }

  async deleteAlbumFavoritesById(albumId: string) {
    if (
      albumId === undefined ||
      !(albumId === null ? true : await isIdValid(albumId))
    ) {
        throw new HttpException(
            'required parameter "albumId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const album = await this.databaseService.deleteAlbumFavoritesById(albumId);
    if (!album) {
        throw new HttpException(
            'Album does not exist in favorites',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return album;
  }


  async addArtistToFavorites(artistId: string) {
    if (
      artistId === undefined ||
      !(artistId === null ? true : await isIdValid(artistId))
    ) {
        throw new HttpException(
            'required parameter "artistId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const artist = await this.databaseService.addArtistToFavorites(artistId);
    if (!artist) {
        throw new HttpException(
            'Artist does not exist',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return artist;
  }

  async deleteArtistFavoritesById(artistId: string) {
    if (
      artistId === undefined ||
      !(artistId === null ? true : await isIdValid(artistId))
    ) {
        throw new HttpException(
            'required parameter "artistId" is missing or invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
    }

    const artist = await this.databaseService.deleteArtistFavoritesById(artistId);
    if (!artist) {
        throw new HttpException(
            'Artist does not exist in favorites',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
    }

    return artist;
  }

}