import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favs.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favsRepository: Repository<FavoritesEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>
  ) {}

  favsRep = {
    artists: [],
    albums: [],
    tracks: []
  }
  
  async getAll() {
    return this.favsRep;
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id }});

    if(!track) {
      throw new HttpException('id not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.favsRep.tracks.push(track);
    return track;
  }

  async deleteTrack(id: string) {
    return `${id} deleted from favs`;
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id }});

    if(!album) {
      throw new HttpException('id not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    this.favsRep.albums.push(album);
    return album;
  }

  async deleteAlbum(id: string) {
    return `${id} deleted from favs`;
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id }});

    if(!artist) {
      throw new HttpException('id not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    this.favsRep.artists.push(artist);
    return artist;
  }

  async deleteArtist(id: string) {
    return `${id} deleted from favs`;
  }
}
