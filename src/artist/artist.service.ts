import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { ArtistModel } from './artist.model';
import { dbService } from 'src/utils/data/db.service';

@Injectable()
export class ArtistService {

  @Inject(dbService)
  private readonly databaseService: dbService;

  async getAllArtists() {
    return this.databaseService.getAllArtists();
  }

  async getArtistById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.databaseService.getArtistById(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async CreateArtist(dto: Omit<ArtistModel, 'id'>) {
    if (!dto.name) {
      throw new HttpException(
        'required parameter "name" is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.grammy === undefined || typeof dto.grammy !== 'boolean') {
      throw new HttpException(
        'required parameter "grammy" is missing or have incorrect type',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.databaseService.CreateArtist(dto.name, dto.grammy);
  }

  async updateArtistInfo(id: string, dto: Omit<ArtistModel, 'id'>) {
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

    if (dto.grammy === undefined || typeof dto.grammy !== 'boolean') {
      throw new HttpException(
        'required parameter "grammy" is missing or have incorrect type',
        HttpStatus.BAD_REQUEST,
      );
    }

    const putedArtist = await this.databaseService.updateArtistInfo(id, dto.name, dto.grammy);

    if (!putedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return putedArtist;
  }

  async deleteArtistById(id: string) {
    if (!(await isIdValid(id))) {
      throw new HttpException(
        'id parameter is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedArtist = await this.databaseService.deleteArtistById(id);

    if (!deletedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return deletedArtist;
  }
}
