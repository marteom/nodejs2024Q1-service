interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumModel implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
