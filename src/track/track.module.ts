import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  imports: [
    TypeOrmModule.forFeature([TrackEntity]), 
    FavoritesModule,
    forwardRef(() => AuthModule)
  ],
})
export class TrackModule {}
