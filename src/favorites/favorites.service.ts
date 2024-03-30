import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { isIdValid } from 'src/utils/common-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoriteService {

  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favRepository: Repository<FavoritesEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  private async getFavs() {
    let favorites = await this.favRepository.findOne({
      where: {},
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    if (!favorites) {
      favorites = {
        albums: [],
        artists: [],
        tracks: [],
      } as unknown as FavoritesEntity;
    }

    return favorites;
  }

  async getAllFavorites() {
    const favorites = await this.getFavs();
    const favResponse = {
      albums: favorites.albums || [],
      artists: favorites.artists || [],
      tracks: favorites.tracks || [],
    };
    return favResponse;
  }

  async addTrackToFavorites(id: string) {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "id" is missing or invalid (not uuid)');
    }
    const track = await this.entityManager.findOneBy(TrackEntity, { id });
    if (!track) {
      throw new UnprocessableEntityException(`Track with ID ${id} not found`);
    }
    const favorites = await this.getFavs();
    favorites['tracks'].push(track as any);
    return await this.favRepository.save(favorites);
  }

  async deleteTrackFavoritesById(id: string): Promise<void> {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "id" is missing or invalid (not uuid)');
    }
    const track = await this.entityManager.findOneBy(TrackEntity, { id });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} does not exist`);
    }
    let favorites = await this.favRepository.findOne({
      where: {},
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    const trackIndex = favorites['tracks'].findIndex((t) => t.id === track.id);

    favorites['tracks'].splice(trackIndex, 1);
    await this.favRepository.save(favorites);
  }

  async addAlbumToFavorites(id: string) {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "id" is missing or invalid (not uuid)');
    }
    const album = await this.entityManager.findOneBy(AlbumEntity, { id });
    if (!album) {
      throw new UnprocessableEntityException(`Album with ID ${id} not found`);
    }
    const favorites = await this.getFavs();
    favorites['albums'].push(album as any);
    return await this.favRepository.save(favorites);
  }

  async deleteAlbumFavoritesById(id: string): Promise<void>  {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "albumId" is missing or invalid (not uuid)');
    }
    const album = await this.entityManager.findOneBy(AlbumEntity, { id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} does not exist`);
    }
    let favorites = await this.favRepository.findOne({
      where: {},
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    const albumIndex = favorites['albums'].findIndex((a) => a.id === album.id);

    favorites['albums'].splice(albumIndex, 1);
    await this.favRepository.save(favorites);
  }

  async addArtistToFavorites(id: string) {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }
    const artist = await this.entityManager.findOneBy(ArtistEntity, { id });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} does not exist`,
      );
    }
    const favorites = await this.getFavs();
    favorites['artists'].push(artist as any);
    return await this.favRepository.save(favorites);
  }

  async deleteArtistFavoritesById(id: string): Promise<void>  {
    if (id === undefined || !(id === null ? true : await isIdValid(id))) {
        throw new BadRequestException('required parameter "artistId" is missing or invalid (not uuid)');
    }
    const artist = await this.entityManager.findOneBy(ArtistEntity, { id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} does not exist`);
    }
    let favorites = await this.favRepository.findOne({
      where: {},
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    const artistIndex = favorites['artists'].findIndex(
      (a) => a.id === artist.id,
    );

    favorites['artists'].splice(artistIndex, 1);
    await this.favRepository.save(favorites);
  }

}