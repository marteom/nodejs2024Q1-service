import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { albumsData } from './data/album.data';
import {
  delAlbumFromFavorites,
  isIdValid,
  nulledAlbumForTrack,
} from '../utils/common-utils';
import { AlbumModel } from './album.model';
import { getAlbum } from './utils/helper';
import { tracksData } from '../track/data/track.data';

@Injectable()
export class AlbumService {
  async getAllAlbums() {
    return albumsData;
  }

  async getAlbumById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: AlbumModel = albumsData.find(
      (element: AlbumModel) => element.id === id,
    );

    if (album) {
      return album;
    }

    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
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

    const newAlbum = await getAlbum(dto.name, dto.year, dto.artistId);
    albumsData.push(newAlbum);
    return newAlbum;
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

    const putedAlbumIndex = albumsData.findIndex(
      (element: AlbumModel) => element.id === id,
    );

    if (putedAlbumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    albumsData[putedAlbumIndex].name = dto.name;
    albumsData[putedAlbumIndex].year = dto.year;
    albumsData[putedAlbumIndex].artistId = dto.artistId;

    return albumsData[putedAlbumIndex];
  }

  async deleteAlbumById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedAlbumIndex = albumsData.findIndex(
      (element: AlbumModel) => element.id === id,
    );

    if (deletedAlbumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await delAlbumFromFavorites(id);
    await nulledAlbumForTrack(tracksData, id);

    return albumsData.splice(deletedAlbumIndex, 1);
  }
}
