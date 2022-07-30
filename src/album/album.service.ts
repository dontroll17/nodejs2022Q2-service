import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './interface/album.interface';

@Injectable()
export class AlbumService {
  albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    const result = this.albums.find((item) => item.id === id);

    if (!result) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: v4(),
      ...createAlbumDto,
    };

    this.albums.push(album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const albumFilter = this.albums.filter((item) => item.id !== id);

    const album = this.albums.find((item) => item.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albums = albumFilter;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album = this.albums.find((item) => item.id === id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const store = this.albums.filter((item) => item.id !== id);
    this.albums = store;

    album = {
      id: id,
      ...updateAlbumDto,
    };

    this.albums.push(album);
    return album;
  }
}
