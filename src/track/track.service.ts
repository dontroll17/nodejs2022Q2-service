import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './interface/track.interface';

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track> {
    const result = this.tracks.find((item) => item.id === id);

    if (!result) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      ...createTrackDto,
      id: v4()
    };

    this.tracks.push(track);
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const filterTrack = this.tracks.filter((item) => item.id !== id);

    const track = this.tracks.find(item => item.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    this.tracks = filterTrack;
  }

  async changeTrack(id: string, updateTrackDto: UpdateTrackDto) {
    let track = this.tracks.find((item) => item.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const store = this.tracks.filter((item) => item.id !== id);
    this.tracks = store;

    track = {
      id: id,
      ...updateTrackDto,
    };

    this.tracks.push(track);
    return track;
  }
}
