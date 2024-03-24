import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { AlbumModel } from './album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {

  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async CreateAlbum(dto: Omit<AlbumModel, 'id'>): Promise<AlbumEntity> {
    const { name, year, artistId } = dto;

    if (!year || typeof year !== 'number') {
      throw new BadRequestException('required parameter "year" is missing or have incorrect type');
    }

    if (artistId === undefined || !(artistId === null ? true : await isIdValid(artistId))) {
      throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }

    const album = this.albumRepository.create({
      name,
      year,
      artistId,
    });
    return await this.albumRepository.save(album);
  }

  async updateAlbumInfo(id: string, dto: Omit<AlbumModel, 'id'>): Promise<AlbumEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }

    const { name, year, artistId } = dto;

    const album = await this.albumRepository.findOne({ where: { id } });
    if (!name) {
      throw new BadRequestException('required parameter "name" is missing');
    }

    if (!year || typeof year !== 'number') {
      throw new BadRequestException('required parameter "year" is missing or have incorrect type');
    }

    if (artistId === undefined || !(artistId === null ? true : await isIdValid(artistId))) {
      throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    if (name) {
      album.name = name;
    }
    if (year) {
      album.year = year;
    }
    if (artistId !== undefined) {
      album.artistId = artistId;
    }

    return await this.albumRepository.save(album);
  }

  async deleteAlbumById(id: string): Promise<void> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  }
}
