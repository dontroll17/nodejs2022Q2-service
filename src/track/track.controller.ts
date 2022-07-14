import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from './interface/track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Get()
    async getAllTracks(): Promise<Track[]> {
        return await this.trackService.getAllTracks();
    }

    @Get(':id')
    async getOneTrack(
        @Param('id') id: string
    ): Promise<Track> {
        return await this.trackService.getTrackById(id);
    }

    @Post()
    async createTrack(
        @Body() createTrackDto: CreateTrackDto
    ) {
        return await this.trackService.createTrack(createTrackDto)
    }

    @Delete(':id')
    async deleteTrack(
        @Param('id') id: string
    ) {
        return await this.trackService.deleteTrack(id);
    }
}
