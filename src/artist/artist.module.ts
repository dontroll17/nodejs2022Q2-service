import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [
    TypeOrmModule.forFeature([ArtistEntity, TrackEntity]),
    FavoritesModule,
    forwardRef(() => AuthModule)
  ],
})
export class ArtistModule {}
