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

import { TrackModel } from './track.model';
import { Response } from 'express';
import { delTrackFromFavorites, isIdValid } from '../utils/common-utils';
import { tracksData } from './data/track.data';
import { getTrack } from './utils/helper.js';

@Controller('track')
export class TrackController {
  @Get()
  async getAllTracks() {
    return tracksData;
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const track: TrackModel = tracksData.find(
      (element: TrackModel) => element.id === id,
    );

    if (track) {
      return response.status(HttpStatus.OK).send(track);
    }

    return response.status(HttpStatus.NOT_FOUND).send('Track not found');
  }

  @Post()
  async CreateTrackDto(
    @Body() dto: Omit<TrackModel, 'id'>,
    @Res() response: Response,
  ) {
    if (
      dto.albumId === undefined ||
      !(dto.albumId === null ? true : await isIdValid(dto.albumId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "albumId" is missing or invalid (not uuid)');
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (!dto.duration) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "duration" is missing');
    }

    const newTrack = await getTrack(
      dto.albumId,
      dto.artistId,
      dto.name,
      dto.duration,
    );
    tracksData.push(newTrack);
    return response.status(HttpStatus.CREATED).send(newTrack);
  }

  @Put(':id')
  async updateTrackInfo(
    @Param('id') id: string,
    @Body() dto: Omit<TrackModel, 'id'>,
    @Res() response: Response,
  ) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    if (
      dto.albumId === undefined ||
      !(dto.albumId === null ? true : await isIdValid(dto.albumId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "albumId" is missing or invalid (not uuid)');
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "artistId" is missing or invalid (not uuid)');
    }

    if (!dto.name) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "name" is missing');
    }

    if (!dto.duration) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "duration" is missing');
    }

    const putedTrackIndex = tracksData.findIndex(
      (element: TrackModel) => element.id === id,
    );

    if (putedTrackIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Track not found');
    }

    tracksData[putedTrackIndex].albumId = dto.albumId;
    tracksData[putedTrackIndex].artistId = dto.artistId;
    tracksData[putedTrackIndex].duration = dto.duration;
    tracksData[putedTrackIndex].name = dto.name;

    return response.status(HttpStatus.OK).send(tracksData[putedTrackIndex]);
  }

  @Delete(':id')
  async deleteTrackById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const deletedTrackIndex = tracksData.findIndex(
      (element: TrackModel) => element.id === id,
    );

    if (deletedTrackIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('Track not found');
    }

    await delTrackFromFavorites(id);

    tracksData.splice(deletedTrackIndex, 1);

    return response
      .status(HttpStatus.NO_CONTENT)
      .send('Track successfully deleted');
  }
}
