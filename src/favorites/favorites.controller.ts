import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { favoritesData } from './data/favorites.data';
import { tracksData } from '../track/data/track.data';
import { albumsData } from '../album/data/album.data';
import { artistsData } from '../artist/data/artist.data';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils';
import {
  getAlbumsArray,
  getArtistsArray,
  getTracksArray,
} from '../utils/common-utils';

@Controller('favs')
export class FavoritesController {
  @Get()
  async getAllFavorites() {
    return {
      artists: await getArtistsArray(artistsData, favoritesData.artists),
      albums: await getAlbumsArray(albumsData, favoritesData.albums),
      tracks: await getTracksArray(tracksData, favoritesData.tracks),
    };
  }

  @Post('/track/:id')
  async addTrackToFavoritesDto(
    @Param('id') trackId: string,
    @Res() response: Response,
  ) {
    if (
      trackId === undefined ||
      !(trackId === null ? true : await isIdValid(trackId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "trackId" is missing or invalid (not uuid)');
    }

    const trackIndex = tracksData.findIndex(
      (element) => element.id === trackId,
    );
    if (trackIndex === -1) {
      return response
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(`Track does not exist`);
    }

    favoritesData.tracks.push(trackId);
    return response
      .status(HttpStatus.CREATED)
      .send(`Track ${trackId} successfully add to favorites`);
  }

  @Delete('/track/:id')
  async deleteTrackFavoritesById(
    @Param('id') trackId: string,
    @Res() response: Response,
  ) {
    if (
      trackId === undefined ||
      !(trackId === null ? true : await isIdValid(trackId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "trackId" is missing or invalid (not uuid)');
    }

    const trackIndex = tracksData.findIndex(
      (element) => element.id === trackId,
    );
    if (trackIndex === -1) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Track does not exist in favorites`);
    }

    favoritesData.tracks.splice(trackIndex, 1);
    return response
      .status(HttpStatus.NO_CONTENT)
      .send(`Track ${trackId} successfully delete from favorites`);
  }

  @Post('/album/:id')
  async addAlbumToFavoritesDto(
    @Param('id') albumId: string,
    @Res() response: Response,
  ) {
    if (
      albumId === undefined ||
      !(albumId === null ? true : await isIdValid(albumId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "albumId" is missing or invalid (not uuid)');
    }

    const albumIndex = albumsData.findIndex(
      (element) => element.id === albumId,
    );
    if (albumIndex === -1) {
      return response
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(`Album does not exist`);
    }

    favoritesData.albums.push(albumId);
    return response
      .status(HttpStatus.CREATED)
      .send(`Album ${albumId} successfully add to favorites`);
  }

  @Delete('/album/:id')
  async deleteAlbumFavoritesById(
    @Param('id') albumId: string,
    @Res() response: Response,
  ) {
    if (
      albumId === undefined ||
      !(albumId === null ? true : await isIdValid(albumId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "albumId" is missing or invalid (not uuid)');
    }

    const albumIndex = albumsData.findIndex(
      (element) => element.id === albumId,
    );
    if (albumIndex === -1) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Album does not exist in favorites`);
    }

    favoritesData.albums.splice(albumIndex, 1);
    return response
      .status(HttpStatus.NO_CONTENT)
      .send(`Album ${albumId} successfully delete from favorites`);
  }

  @Post('/artist/:id')
  async addArtistToFavoritesDto(
    @Param('id') artistId: string,
    @Res() response: Response,
  ) {
    if (
      artistId === undefined ||
      !(artistId === null ? true : await isIdValid(artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    const artistIndex = artistsData.findIndex(
      (element) => element.id === artistId,
    );
    if (artistIndex === -1) {
      return response
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(`Artist does not exist`);
    }

    favoritesData.artists.push(artistId);
    return response
      .status(HttpStatus.CREATED)
      .send(`Artist ${artistId} successfully add to favorites`);
  }

  @Delete('/artist/:id')
  async deleteArtistFavoritesById(
    @Param('id') artistId: string,
    @Res() response: Response,
  ) {
    if (
      artistId === undefined ||
      !(artistId === null ? true : await isIdValid(artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    const artistIndex = artistsData.findIndex(
      (element) => element.id === artistId,
    );
    if (artistIndex === -1) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Artist does not exist in favorites`);
    }

    favoritesData.artists.splice(artistIndex, 1);
    return response
      .status(HttpStatus.NO_CONTENT)
      .send(`Artist ${artistId} successfully delete from favorites`);
  }
}
