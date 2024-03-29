import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { Artist } from './interface/artist.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    private favsRep: FavoritesService,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async deleteArtist(id: string): Promise<void> {
    const findTrack = await this.trackRepository.findOne({
      where: {
        artistId: id,
      },
    });

    if (findTrack) {
      findTrack.artistId = null;
      findTrack.albumId = null;
      await this.trackRepository.save(findTrack);
    }

    const res = await this.artistRepository.delete(id);

    if (res.affected === 0) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    this.favsRep.deleteArtist(id);
  }

  async changeArtist(id: string, updateArtistDto: UpdateArtistDto) {
    let artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    artist = {
      id: id,
      ...updateArtistDto,
    };

    await this.artistRepository.save(artist);
    return artist;
  }
}
