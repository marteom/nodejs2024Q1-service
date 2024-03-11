import { ArtistModel } from '../artist.model';
import { v4 as uuidv4 } from 'uuid';

export const getArtist = async (
  name: string,
  grammy: boolean,
): Promise<ArtistModel> => {
  const artistModel = new ArtistModel();
  artistModel.id = uuidv4();
  artistModel.name = name;
  artistModel.grammy = grammy;

  return artistModel;
};
