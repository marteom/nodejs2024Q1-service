import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('favorites')
export class FavoritesEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { onDelete: 'SET NULL' })
  @JoinTable()
  tracks: TrackEntity[];
}