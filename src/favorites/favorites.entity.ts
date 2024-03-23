import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('favorites')
export class FavoritesEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @OneToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string;


  @OneToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string;


  @OneToOne(() => TrackEntity, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: TrackEntity;

  @Column({ type: 'uuid', nullable: true, default: null })
  trackId: string;

}