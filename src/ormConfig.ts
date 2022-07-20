import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { UserEntity } from './users/entities/user.entity';
import { TrackEntity } from './track/entities/track.entity';
import { ArtistEntity } from './artist/entities/artist.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [UserEntity, TrackEntity, ArtistEntity],
  migrations: [],
} as DataSourceOptions;
