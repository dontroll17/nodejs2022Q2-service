import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { Album } from './interface/album.interface';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    const result = this.albums.find((item) => item.id === id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }

    return result;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: v4(),
      ...createAlbumDto,
      artistId: null,
    };

    this.albums.push(album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const albumFilter = this.albums.filter((item) => item.id !== id);

    if (albumFilter === this.albums) {
      throw new NotFoundException('Album not found');
    }

    this.albums = albumFilter;
  }
}
