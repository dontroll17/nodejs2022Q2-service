import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/createArtist.dto';
import { Artist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
    private artists: Artist[] = [];

    async getAllArtists(): Promise<Artist[]> {
        return this.artists;
    }

    async getArtistById(id: string): Promise<Artist> {
        const result = this.artists.find(item => item.id === id);

        if(!result) {
            throw new NotFoundException('Artist not found')
        }

        return result;
    }

    async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
        const artist: Artist = {
            id: v4(),
            ...createArtistDto
        }

        this.artists.push(artist);
        return artist;
    }

    async deleteArtist(id: string): Promise<void> {
        const filterArtist = this.artists.filter(item => item.id !== id);

        if(filterArtist === this.artists) {
            throw new NotFoundException('Artist not found');
        }

        this.artists = filterArtist;
    }
}
