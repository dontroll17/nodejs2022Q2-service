import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, TrackEntity]),
    FavoritesModule,
    forwardRef(() => AuthModule)
  ],
})
export class AlbumModule {}
