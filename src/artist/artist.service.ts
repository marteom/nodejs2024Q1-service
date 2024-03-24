import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { ArtistModel } from './artist.model';
import { ArtistEntity } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {

  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async CreateArtist(dto: Omit<ArtistModel, 'id'>): Promise<ArtistEntity> {
    const { name, grammy } = dto;
    if (!name) {
      throw new BadRequestException('required parameter "name" is missing');
    }

    if (grammy === undefined || typeof grammy !== 'boolean') {
      throw new BadRequestException('required parameter "grammy" is missing or have incorrect type');
    }

    const newArtist = this.artistRepository.create({
      name,
      grammy,
    });
    return await this.artistRepository.save(newArtist);
  }

  async updateArtistInfo(id: string, dto: Omit<ArtistModel, 'id'>): Promise<ArtistEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }

    const { name, grammy } = dto;

    if (!name) {
      throw new BadRequestException('required parameter "name" is missing');
    }

    if (grammy === undefined || typeof grammy !== 'boolean') {
      throw new BadRequestException('required parameter "grammy" is missing or have incorrect type');
    }

    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    artist.name = name;
    artist.grammy = grammy;
    return await this.artistRepository.save(artist);
  }

  async deleteArtistById(id: string): Promise<void> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
  }
}
