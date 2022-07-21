import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favs.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favsRepository: Repository<FavoritesEntity>
  ) {}

  
  async getAll() {
    const [favs] = await this.favsRepository.find();

    return {
      artists: favs.artists,
      albums: favs.albums,
      tracks: favs.tracks
    };
  }

  async addTrack(id: string) {
    return `${id} added to favs`;
  }

  async deleteTrack(id: string) {
    return `${id} deleted from favs`;
  }

  async addAlbum(id: string) {
    return `${id} added to favs`;
  }

  async deleteAlbum(id: string) {
    return `${id} deleted from favs`;
  }

  async addArtist(id: string) {
    return `${id} added to favs`;
  }

  async deleteArtist(id: string) {
    return `${id} deleted from favs`;
  }
}
