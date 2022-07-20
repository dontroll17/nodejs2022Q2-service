import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column({
        nullable: true
    })
    albumId: string | null;

    @Column({
        nullable: true
    })
    artistId: string | null;
}