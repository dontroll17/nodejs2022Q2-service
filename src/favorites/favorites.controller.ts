import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
    constructor(private favsService: FavoritesService) {}

    @Get()
    async getAll() {
        return this.favsService.getAll();
    }
}
