export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class ArtistModel implements Artist {
  id: string;
  name: string;
  grammy: boolean;
}
