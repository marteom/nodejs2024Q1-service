import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isIdValid } from '../utils/common-utils';
import { TrackModel } from './track.model';
import { TrackEntity } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {

  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllTracks(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async CreateTrack(dto: Omit<TrackModel, 'id'>): Promise<TrackEntity> {
    const { name, artistId, albumId, duration } = dto;
    if (albumId === undefined || !(albumId === null ? true : await isIdValid(albumId))) {
      throw new BadRequestException('required parameter "albumId" is missing or invalid (not uuid)');
    }
    if (artistId === undefined || !(artistId === null ? true : await isIdValid(artistId))) {
      throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }

    if (!name) {
      throw new BadRequestException('required parameter "name" is missing');
    }

    if (!duration) {
      throw new BadRequestException('required parameter "duration" is missing');
    }

    const track = this.trackRepository.create({
      name,
      artistId,
      albumId,
      duration,
    });
    return await this.trackRepository.save(track);
  }

  async updateTrackInfo(id: string, dto: Omit<TrackModel, 'id'>): Promise<TrackEntity> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }

    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    const { name, artistId, albumId, duration } = dto;

    if (albumId === undefined || !(albumId === null ? true : await isIdValid(albumId))) {
      throw new BadRequestException('required parameter "albumId" is missing or invalid (not uuid)');
    }
    if (artistId === undefined || !(artistId === null ? true : await isIdValid(artistId))) {
      throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }
    if (!name) {
      throw new BadRequestException('required parameter "name" is missing');
    }
    if (!duration) {
      throw new BadRequestException('required parameter "duration" is missing');
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return await this.trackRepository.save(track);
  }

  async deleteTrackById(id: string): Promise<void> {
    if (!(await isIdValid(id))) {
      throw new BadRequestException('id parameter is invalid (not uuid)');
    }
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
  }
}
