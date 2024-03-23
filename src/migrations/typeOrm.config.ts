import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { FavoritesEntity } from '../favorites/favorites.entity';
//import { migrations1676911635497 } from './1676911635497-migrations';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [UserEntity, AlbumEntity, TrackEntity, ArtistEntity, FavoritesEntity],
  //migrations: [migrations1676911635497]
};

const dataSource = new DataSource(config);
export default dataSource;