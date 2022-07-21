import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favs.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [TypeOrmModule.forFeature([FavoritesEntity, ArtistEntity, AlbumEntity, TrackEntity])]
})
export class FavoritesModule {}
