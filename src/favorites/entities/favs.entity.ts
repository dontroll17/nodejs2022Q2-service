import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesEntity {
    //fix
    @Column('text', { array: true })
    artist: string[];

    @Column('text', { array: true })
    albums: string[];

    @PrimaryColumn('text', { array: true })
    tracks: string[];
}