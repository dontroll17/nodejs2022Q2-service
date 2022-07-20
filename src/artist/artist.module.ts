import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([ArtistEntity])]
})
export class ArtistModule {}
