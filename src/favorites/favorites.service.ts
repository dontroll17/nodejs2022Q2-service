import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favs.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favsRepository: Repository<FavoritesEntity>
  ) {}

  //wrong!!!
  async getAll() {
    return this.favsRepository.find();
  }
}
