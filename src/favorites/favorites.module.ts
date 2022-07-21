import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favs.entity';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [TypeOrmModule.forFeature([FavoritesEntity])]
})
export class FavoritesModule {}
