import { TrackModel } from '../track.model';
import { v4 as uuidv4 } from 'uuid';

export const getTrack = async (
  albumId: string | null,
  artistId: string | null,
  name: string,
  duration: number,
): Promise<TrackModel> => {
  const trackModel = new TrackModel();
  trackModel.id = uuidv4();
  trackModel.albumId = albumId;
  trackModel.artistId = artistId;
  trackModel.name = name;
  trackModel.duration = duration;

  return trackModel;
};
