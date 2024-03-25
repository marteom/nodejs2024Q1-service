import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, Column } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('favorites')
export class FavoritesEntity {

  // @PrimaryGeneratedColumn('uuid')
  // id: string;


  // @OneToOne(() => ArtistEntity, (artist) => artist.id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'artistId' })
  // artist: ArtistEntity;

  // @Column({ type: 'uuid', nullable: true, default: null })
  // artistId: string;


  // @OneToOne(() => AlbumEntity, (album) => album.id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'albumId' })
  // album: AlbumEntity;

  // @Column({ type: 'uuid', nullable: true, default: null })
  // albumId: string;


  // @OneToOne(() => TrackEntity, (track) => track.id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'trackId' })
  // track: TrackEntity;

  // @Column({ type: 'uuid', nullable: true, default: null })
  // trackId: string;

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