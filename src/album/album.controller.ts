import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { AlbumModel } from './album.model';
import { albumsData } from './data/album.data.js';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils';
import { getAlbum } from './utils/helper.js';
import {
  delAlbumFromFavorites,
  nulledAlbumForTrack,
} from '../utils/common-utils';
import { tracksData } from 'src/track/data/track.data';

@Controller('album')
export class AlbumController {
  @Get()
  async getAllAlbums() {
    return albumsData;
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const album: AlbumModel = albumsData.find(
      (element: AlbumModel) => element.id === id,
    );

    if (album) {
      return response.status(HttpStatus.OK).send(album);
    }

    return response.status(HttpStatus.NOT_FOUND).send('Album not found');
  }

  @Post()
  async CreateAlbumDto(
    @Body() dto: Omit<AlbumModel, 'id'>,
    @Res() response: Response,
  ) {
    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (!dto.year || typeof dto.year !== 'number') {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "year" is missing or have incorrect type');
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    const newAlbum = await getAlbum(dto.name, dto.year, dto.artistId);
    albumsData.push(newAlbum);
    return response.status(HttpStatus.CREATED).send(newAlbum);
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() dto: Omit<AlbumModel, 'id'>,
    @Res() response: Response,
  ) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (!dto.year || typeof dto.year !== 'number') {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "year" is missing or have incorrect type');
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    const putedAlbumIndex = albumsData.findIndex(
      (element: AlbumModel) => element.id === id,
    );

    if (putedAlbumIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Album not found');
    }

    albumsData[putedAlbumIndex].name = dto.name;
    albumsData[putedAlbumIndex].year = dto.year;
    albumsData[putedAlbumIndex].artistId = dto.artistId;

    return response.status(HttpStatus.OK).send(albumsData[putedAlbumIndex]);
  }

  @Delete(':id')
  async deleteAlbumById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const deletedAlbumIndex = albumsData.findIndex(
      (element: AlbumModel) => element.id === id,
    );

    if (deletedAlbumIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Album not found');
    }

    albumsData.splice(deletedAlbumIndex, 1);
    await delAlbumFromFavorites(id);
    await nulledAlbumForTrack(tracksData, id);

    return response
      .status(HttpStatus.NO_CONTENT)
      .send('Album successfully deleted');
  }
}
