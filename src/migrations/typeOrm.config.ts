import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { FavoritesEntity } from '../favorites/favorites.entity';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  entities: [
    UserEntity,
    AlbumEntity,
    TrackEntity,
    ArtistEntity,
    FavoritesEntity,
  ],
  migrations: [process.env.MIGRATIONS],
};

export default config;
