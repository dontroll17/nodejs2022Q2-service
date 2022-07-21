import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { AlbumEntity } from './entities/album.entity';
import { Album } from './interface/album.interface';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: {
        id
      }
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(album);
  }

  async deleteAlbum(id: string): Promise<void> {
    const findTrack = await this.trackRepository.findOne({
      where: {
        albumId: id
      }
    });

    if(findTrack) {
      findTrack.albumId = null;
      await this.trackRepository.save(findTrack);
    }

    const res = await this.albumRepository.delete(id);

    if (res.affected === 0) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album = await this.albumRepository.findOne({
      where: {
        id
      }
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    album = {
      id,
      ...updateAlbumDto
    }

    await this.albumRepository.save(album);
    return album;
  }
}
