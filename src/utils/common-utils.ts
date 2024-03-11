import { AlbumModel } from 'src/album/album.model';
import { ArtistModel } from 'src/artist/artist.model';
import { favoritesData } from 'src/favorites/data/favorites.data';
import { TrackModel } from 'src/track/track.model';
import { validate as uuidValidate } from 'uuid';

export const isIdValid = async (id: string): Promise<boolean> => {
  return uuidValidate(id);
};

export const getTracksArray = async (
  tracksData: Array<TrackModel>,
  trackList: Array<string>,
): Promise<Array<TrackModel>> => {
  const tracks: Array<TrackModel> = [];
  tracksData.forEach((element) => {
    if (trackList.includes(element.id)) {
      tracks.push(element);
    }
  });

  return tracks;
};

export const getAlbumsArray = async (
  albumsData: Array<AlbumModel>,
  albumList: Array<string>,
): Promise<Array<AlbumModel>> => {
  const albums: Array<AlbumModel> = [];
  albumsData.forEach((element) => {
    if (albumList.includes(element.id)) {
      albums.push(element);
    }
  });

  return albums;
};

export const getArtistsArray = async (
  artistsData: Array<ArtistModel>,
  artistList: Array<string>,
): Promise<Array<ArtistModel>> => {
  const artist: Array<ArtistModel> = [];
  artistsData.forEach((element) => {
    if (artistList.includes(element.id)) {
      artist.push(element);
    }
  });

  return artist;
};

export const delArtistFromFavorites = async (
  artistId: string,
): Promise<void> => {
  favoritesData.artists = favoritesData.artists.filter((id) => id !== artistId);
};

export const delAlbumFromFavorites = async (albumId: string): Promise<void> => {
  favoritesData.albums = favoritesData.albums.filter((id) => id !== albumId);
};

export const delTrackFromFavorites = async (trackId: string): Promise<void> => {
  favoritesData.tracks = favoritesData.tracks.filter((id) => id !== trackId);
};

export const nulledArtistForAlbum = async (
  albumsData,
  artistId: string,
): Promise<void> => {
  albumsData = albumsData.map((element) => {
    if (element.artistId === artistId) {
      element.artistId = null;
    }
    return element;
  });
};

export const nulledArtistForTrack = async (
  tracksData,
  artistId: string,
): Promise<void> => {
  tracksData = tracksData.map((element) => {
    if (element.artistId === artistId) {
      element.artistId = null;
    }
    return element;
  });
};

export const nulledAlbumForTrack = async (
  tracksData,
  albumId: string,
): Promise<void> => {
  tracksData = tracksData.map((element) => {
    if (element.albumId === albumId) {
      element.albumId = null;
    }
    return element;
  });
};
