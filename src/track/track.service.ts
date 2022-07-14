import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from './interface/track.interface';

@Injectable()
export class TrackService {
    private tracks: Track[] = [];

    async getAllTracks(): Promise<Track[]> {
        return this.tracks;
    }

    async getTrackById(id: string): Promise<Track> {
        const result = this.tracks.find(item => item.id === id);

        if(!result) {
            throw new NotFoundException('Track not found');
        }

        return result;
    }

    async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
        const track: Track = {
            ...createTrackDto,
            id: v4(),
            artistId: null,
            albumId: null
        }

        this.tracks.push(track);
        return track;
    }

    async deleteTrack(id: string): Promise<void> {
        const filterTrack = this.tracks.filter(item => item.id !== id);

        if(filterTrack === this.tracks) {
            throw new NotFoundException('Track not found');
        }

        this.tracks = filterTrack;
    }
}
