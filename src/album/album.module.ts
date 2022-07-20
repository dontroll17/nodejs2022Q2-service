import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [TypeOrmModule.forFeature([AlbumEntity])]
})
export class AlbumModule {}
