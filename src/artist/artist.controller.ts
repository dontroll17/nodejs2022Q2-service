import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { Artist } from './interface/artist.interface';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get()
    async getAllArtists(): Promise<Artist[]> {
        return await this.artistService.getAllArtists();
    }

    @Get(':id')
    async getOneArtist(
        @Param('id', new ParseUUIDPipe({
            version: '4'
          })) id: string
    ): Promise<Artist> {
        return await this.artistService.getArtistById(id);
    }

    @Post()
    async createArtist(
        @Body() createArtistDto: CreateArtistDto
    ): Promise<Artist> {
        return await this.artistService.createArtist(createArtistDto);
    }

    @Delete(':id')
    async deleteArtist(
        @Param('id', new ParseUUIDPipe({
            version: '4'
          })) id: string
    ) {
        return await this.artistService.deleteArtist(id);
    }
}
