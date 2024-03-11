import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { tracksData } from './data/track.data';
import { delTrackFromFavorites, isIdValid } from 'src/utils/common-utils';
import { TrackModel } from './track.model';
import { getTrack } from './utils/helper';

@Injectable()
export class TrackService {
  async getAllTracks() {
    return tracksData;
  }

  async getTrackById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: TrackModel = tracksData.find(
      (element: TrackModel) => element.id === id,
    );

    if (track) {
      return track;
    }

    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async CreateTrackDto(dto: Omit<TrackModel, 'id'>) {
    if (
      dto.albumId === undefined ||
      !(dto.albumId === null ? true : await isIdValid(dto.albumId))
    ) {
      throw new HttpException(
        'required parameter "albumId" is missing or invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      throw new HttpException(
        'required parameter "artistId" is missing or invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.name) {
      throw new HttpException(
        'required parameter "name" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.duration) {
      throw new HttpException(
        'required parameter "duration" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTrack = await getTrack(
      dto.albumId,
      dto.artistId,
      dto.name,
      dto.duration,
    );
    tracksData.push(newTrack);
    return newTrack;
  }

  async updateTrackInfo(id: string, dto: Omit<TrackModel, 'id'>) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      dto.albumId === undefined ||
      !(dto.albumId === null ? true : await isIdValid(dto.albumId))
    ) {
      throw new HttpException(
        'required parameter "albumId" is missing or invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      dto.artistId === undefined ||
      !(dto.artistId === null ? true : await isIdValid(dto.artistId))
    ) {
      throw new HttpException(
        'required parameter "artistId" is missing or invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.name) {
      throw new HttpException(
        'required parameter "name" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.duration) {
      throw new HttpException(
        'required parameter "duration" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const putedTrackIndex = tracksData.findIndex(
      (element: TrackModel) => element.id === id,
    );

    if (putedTrackIndex === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    tracksData[putedTrackIndex].albumId = dto.albumId;
    tracksData[putedTrackIndex].artistId = dto.artistId;
    tracksData[putedTrackIndex].duration = dto.duration;
    tracksData[putedTrackIndex].name = dto.name;

    return tracksData[putedTrackIndex];
  }

  async deleteTrackById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedTrackIndex = tracksData.findIndex(
      (element: TrackModel) => element.id === id,
    );

    if (deletedTrackIndex === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await delTrackFromFavorites(id);

    return tracksData.splice(deletedTrackIndex, 1);
  }
}
