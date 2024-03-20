import { AlbumModel } from '../album.model';
import { v4 as uuidv4 } from 'uuid';

export const getAlbum = async (
  name: string,
  year: number,
  artistId: string | null,
): Promise<AlbumModel> => {
  const albumModel = new AlbumModel();
  albumModel.id = uuidv4();
  albumModel.name = name;
  albumModel.year = Number(year);
  albumModel.artistId = artistId;

  return albumModel;
};