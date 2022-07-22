import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [TypeOrmModule.forFeature([TrackEntity]), FavoritesModule]
})
export class TrackModule {}
