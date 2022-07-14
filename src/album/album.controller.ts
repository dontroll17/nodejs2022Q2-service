import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { Album } from './interface/album.interface';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get()
    async getAllAlbums(): Promise<Album[]> {
        return await this.albumService.getAllAlbums();
    }

    @Get(':id')
    async getAlbumById(
        @Param('id', new ParseUUIDPipe({
            version: '4'
          })) id: string
    ): Promise<Album> {
        return await this.albumService.getAlbumById(id);
    }

    @Post()
    async createAlbum(
        @Body() createAlbumDto: CreateAlbumDto
    ): Promise<Album> {
        return await this.albumService.createAlbum(createAlbumDto);
    }

    @Delete(':id')
    async deleteAlbum(
        @Param('id', new ParseUUIDPipe({
            version: '4'
          })) id: string
    ) {
        return await this.albumService.deleteAlbum(id);
    }
}
