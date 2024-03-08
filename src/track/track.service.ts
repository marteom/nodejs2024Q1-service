import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { TrackModel } from './track.model';
import { dbService } from 'src/utils/data/db.service';

@Injectable()
export class TrackService {

  //@Inject(dbService)
  private readonly databaseService: dbService;

  async getAllTracks() {
    return this.databaseService.getAllTracks();
  }

  async getTrackById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.databaseService.getTrackById(id);

    if (track) {
      return track;
    }

    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async CreateTrack(dto: Omit<TrackModel, 'id'>) {
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

    const newTrack = await this.databaseService.CreateTrack(dto.albumId, dto.artistId, dto.name, dto.duration);
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

    const putedTrack = await this.databaseService.updateTrackInfo(id, dto.albumId, dto.artistId, dto.duration, dto.name);

    if (!putedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return putedTrack;
  }

  async deleteTrackById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedTrack = await this.databaseService.deleteTrackById(id);

    if (!deletedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return deletedTrack;
  }
}
