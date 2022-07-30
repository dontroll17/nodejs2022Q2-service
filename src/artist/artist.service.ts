import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { Artist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    const result = this.artists.find((item) => item.id === id);

    if (!result) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: v4(),
      ...createArtistDto,
    };

    this.artists.push(artist);
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const filterArtist = this.artists.filter((item) => item.id !== id);

    const artist = this.artists.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    this.artists = filterArtist;
  }

  async changeArtist(id: string, updateArtistDto: UpdateArtistDto) {
    let artist = this.artists.find((item) => item.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const store = this.artists.filter((item) => item.id !== id);
    this.artists = store;

    artist = {
      id: id,
      ...updateArtistDto,
    };

    this.artists.push(artist);
    return artist;
  }
}
