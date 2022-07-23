import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, TrackEntity]),
    FavoritesModule,
  ],
})
export class AlbumModule {}
