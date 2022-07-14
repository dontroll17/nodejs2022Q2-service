import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
