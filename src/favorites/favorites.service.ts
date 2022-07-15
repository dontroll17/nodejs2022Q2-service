import { Injectable } from '@nestjs/common';
import { Favorites } from './dto/favorites.dto';

@Injectable()
export class FavoritesService {
    favorites: Favorites = {
        albums: [],
        artists: [],
        tracks: []
    }

    async getAll() {
        return this.favorites;
    }

    async addTrack(id: string) {

    }
}
