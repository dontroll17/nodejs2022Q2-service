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
        nullable: true,
        type: 'uuid'
    })
    albumId: string | null;

    @Column({
        nullable: true,
        type: 'uuid'
    })
    artistId: string | null;
}