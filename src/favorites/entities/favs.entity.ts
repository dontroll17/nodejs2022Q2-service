import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesEntity {
    @PrimaryColumn()
    id: string;

    @Column('uuid', { array: true })
    artists: string[];

    @Column('uuid', { array: true })
    albums: string[];

    @Column('uuid', { array: true })
    tracks: string[];
}