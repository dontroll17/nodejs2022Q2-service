import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interface/track.interface';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    private favsRep: FavoritesService
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: {
        id
      }
    });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  async deleteTrack(id: string): Promise<void> {
    const res = await this.trackRepository.delete(id);
    
    if (res.affected === 0) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    this.favsRep.deleteTrack(id);
  }

  async changeTrack(id: string, updateTrackDto: UpdateTrackDto) {
    let track = await this.trackRepository.findOne({
      where: {
        id
      }
    });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    track = {
      id: id,
      ...updateTrackDto,
    };

    await this.trackRepository.save(track);
    
    return track;
  }
}
