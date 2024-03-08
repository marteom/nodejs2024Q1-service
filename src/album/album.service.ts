import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { AlbumModel } from './album.model';
import { dbService } from 'src/utils/data/db.service';

@Injectable()
export class AlbumService {

  @Inject(dbService)
  private readonly databaseService: dbService;

  async getAllAlbums() {
    return this.databaseService.getAllAlbums();
  }

  async getAlbumById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.databaseService.getAlbumById(id);
    if(!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async CreateAlbum(dto: Omit<AlbumModel, 'id'>) {
    if (!dto.name) {
      throw new HttpException(
        'required parameter "name" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.year || typeof dto.year !== 'number') {
      throw new HttpException(
        'required parameter "year" is missing or have incorrect type',
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

    return this.databaseService.CreateAlbum(dto.name, dto.year, dto.artistId);
  }

  async updateAlbumInfo(id: string, dto: Omit<AlbumModel, 'id'>) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.name) {
      throw new HttpException(
        'required parameter "name" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.year || typeof dto.year !== 'number') {
      throw new HttpException(
        'required parameter "year" is missing or have incorrect type',
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

    const updatedAlbum = this.databaseService.updateAlbumInfo(id, dto.name, dto.year, dto.artistId);

    if (!updatedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

     return updatedAlbum;
  }

  async deleteAlbumById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedAlbum = this.databaseService.deleteAlbumById(id);

    if (!deletedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return deletedAlbum;
  }
}
