import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { AlbumModel } from "src/album/album.model";
import { ArtistModel } from "src/artist/artist.model";
import { FavoritesModel, FavoritesResponse } from "src/favorites/favorites.model";
import { TrackModel } from "src/track/track.model";
import { UserModel } from "src/user/user.model";
import { getAlbum } from "src/album/utils/helper";
import { getArtist } from "src/artist/utils/helper";
import { getTrack } from "src/track/utils/helper";

@Injectable()
export class dbService {
    private albumsData: Array<AlbumModel> = [];
    private artistsData: Array<ArtistModel> = [];
    private usersData: Array<UserModel> = [];
    private tracksData: Array<TrackModel> = [];
    private favoritesData: FavoritesModel = {
        artists: [],
        albums: [],
        tracks: [],
      };

      async getAllAlbums() {
        return this.albumsData;
      }

      async CreateAlbum(name: string, year: number, artistId: string) {   
        const newAlbum = await getAlbum(name, year, artistId);
        this.albumsData.push(newAlbum);
        return newAlbum;
      }

      async getAlbumById(id: string) {
        const album: AlbumModel = this.albumsData.find(
          (element: AlbumModel) => element.id === id,
        );

        return album;
      }

      async updateAlbumInfo(id: string, name: string, year: number, artistId: string) {
        const putedAlbumIndex = this.albumsData.findIndex(
            (element: AlbumModel) => element.id === id,
          );
      
          if (putedAlbumIndex === -1) {
            return undefined;
          }
      
          this.albumsData[putedAlbumIndex].name = name;
          this.albumsData[putedAlbumIndex].year = year;
          this.albumsData[putedAlbumIndex].artistId = artistId;
      
          return this.albumsData[putedAlbumIndex];
      }

      async deleteAlbumById(id: string) {   
        const deletedAlbumIndex = this.albumsData.findIndex(
          (element: AlbumModel) => element.id === id,
        );
    
        if (deletedAlbumIndex === -1) {
          return undefined;
        }
    
        await this.delAlbumFromFavorites(id);
        await this.nulledAlbumForTrack(id);
    
        return this.albumsData.splice(deletedAlbumIndex, 1);
      }

      getTracksArray = async (
        trackIdList: Array<string>,
      ): Promise<Array<TrackModel>> => {
        const tracks: Array<TrackModel> = [];
        this.tracksData.forEach((element) => {
          if (trackIdList.includes(element.id)) {
            tracks.push(element);
          }
        });
      
        return tracks;
      };
      
      getAlbumsArray = async (
        albumIdList: Array<string>,
      ): Promise<Array<AlbumModel>> => {
        const albums: Array<AlbumModel> = [];
        this.albumsData.forEach((element) => {
          if (albumIdList.includes(element.id)) {
            albums.push(element);
          }
        });
      
        return albums;
      };
      
      getArtistsArray = async (
        artistIdList: Array<string>,
      ): Promise<Array<ArtistModel>> => {
        const artist: Array<ArtistModel> = [];
        this.artistsData.forEach((element) => {
          if (artistIdList.includes(element.id)) {
            artist.push(element);
          }
        });
      
        return artist;
      };
      
      delArtistFromFavorites = async (
        artistId: string,
      ): Promise<void> => {
        this.favoritesData.artists = this.favoritesData.artists.filter((id) => id !== artistId);
      };
      
      delAlbumFromFavorites = async (albumId: string): Promise<void> => {
        this.favoritesData.albums = this.favoritesData.albums.filter((id) => id !== albumId);
      };
      
      delTrackFromFavorites = async (trackId: string): Promise<void> => {
        this.favoritesData.tracks = this.favoritesData.tracks.filter((id) => id !== trackId);
      };
      
      nulledArtistForAlbum = async (
        artistId: string,
      ): Promise<void> => {
        this.albumsData = this.albumsData.map((element) => {
          if (element.artistId === artistId) {
            element.artistId = null;
          }
          return element;
        });
      };
      
      nulledArtistForTrack = async (
        artistId: string,
      ): Promise<void> => {
        this.tracksData = this.tracksData.map((element) => {
          if (element.artistId === artistId) {
            element.artistId = null;
          }
          return element;
        });
      };
      
      nulledAlbumForTrack = async (
        albumId: string,
      ): Promise<void> => {
        this.tracksData = this.tracksData.map((element) => {
          if (element.albumId === albumId) {
            element.albumId = null;
          }
          return element;
        });
      };

      async getAllArtists() {
        return this.artistsData;
      }

      async getArtistById(id: string) {
        const artist: ArtistModel = this.artistsData.find(
          (element: ArtistModel) => element.id === id,
        );
    
        return artist;
      }

      async CreateArtist(name: string, grammy: boolean) {   
        const newArtist = await getArtist(name, grammy);
        this.artistsData.push(newArtist);
        return newArtist;
      }

      async updateArtistInfo(id: string, name: string, grammy: boolean) {
        const putedArtistIndex = this.artistsData.findIndex(
          (element: ArtistModel) => element.id === id,
        );
    
        if (putedArtistIndex === -1) {
          return undefined;
        }
    
        this.artistsData[putedArtistIndex].name = name;
        this.artistsData[putedArtistIndex].grammy = grammy;
    
        return this.artistsData[putedArtistIndex];
      }

      async deleteArtistById(id: string) {
        const deletedArtistIndex = this.artistsData.findIndex(
          (element: ArtistModel) => element.id === id,
        );
    
        if (deletedArtistIndex === -1) {
          return undefined;
        }
    
        await this.delArtistFromFavorites(id);
        await this.nulledArtistForAlbum(id);
        await this.nulledArtistForTrack(id);
    
        return this.artistsData.splice(deletedArtistIndex, 1);
      }

      async getAllTracks() {
        return this.tracksData;
      }

      async getTrackById(id: string) {  
        const track: TrackModel = this.tracksData.find(
          (element: TrackModel) => element.id === id,
        );
    
        return track;
      }

      async CreateTrack(albumId: string, artistId: string, name: string, duration: number) {   
        const newTrack = await getTrack(albumId, artistId, name, duration);
        this.tracksData.push(newTrack);
        return newTrack;
      }

      async updateTrackInfo(id: string, albumId: string, artistId: string, duration: number, name: string) {   
        const putedTrackIndex = this.tracksData.findIndex(
          (element: TrackModel) => element.id === id,
        );
    
        if (putedTrackIndex === -1) {
          return undefined;
        }
    
        this.tracksData[putedTrackIndex].albumId = albumId;
        this.tracksData[putedTrackIndex].artistId = artistId;
        this.tracksData[putedTrackIndex].duration = duration;
        this.tracksData[putedTrackIndex].name = name;
    
        return this.tracksData[putedTrackIndex];
      }

      async deleteTrackById(id: string) {
    
        const deletedTrackIndex = this.tracksData.findIndex(
          (element: TrackModel) => element.id === id,
        );
    
        if (deletedTrackIndex === -1) {
          return undefined;
        }
    
        await this.delTrackFromFavorites(id);
    
        return this.tracksData.splice(deletedTrackIndex, 1);
      }

      async getAllUsers() {
        return this.usersData;
      }

      async getUserById(id: string) {
        return this.usersData.find((element: UserModel) => element.id === id);
      }

      async createUser(userLogin: string, userPassword: string) {
        const newUser: UserModel = {
            id: uuidv4(),
            login: userLogin,
            password: userPassword,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

        this.usersData.push(newUser);
    
        return newUser;
      }

      async updateUserPasword(id: string, newPassword: string) {
        const updatedUser = await this.getUserById(id);
       
        updatedUser.password = newPassword;
        updatedUser.version += 1;
        updatedUser.updatedAt = Date.now();
    
        return updatedUser;
      }

      async deleteUserById(userId: string) {
    
        const deletedUserIndex = this.usersData.findIndex(
          (element: UserModel) => element.id === userId,
        );
    
        if (deletedUserIndex === -1) {
          return undefined;
        }
    
        return this.usersData.splice(deletedUserIndex, 1);
      }

      async getAllFavorites(): Promise<FavoritesResponse> {
        return {
          artists: await this.getArtistsArray(this.favoritesData.artists),
          albums: await this.getAlbumsArray(this.favoritesData.albums),
          tracks: await this.getTracksArray(this.favoritesData.tracks),
        };
      }

    async addTrackToFavorites(trackId: string) {

    const trackIndex = this.tracksData.findIndex(
      (element) => element.id === trackId,
    );
    if (trackIndex === -1) {
        return undefined;
    }

    return this.favoritesData.tracks.push(trackId);
  }

  async deleteTrackFavoritesById(trackId: string) {

    const trackIndex = this.tracksData.findIndex(
      (element) => element.id === trackId,
    );
    if (trackIndex === -1) {
      return undefined;
    }

    return this.favoritesData.tracks.splice(trackIndex, 1);
  }

  async addAlbumToFavorites(albumId: string) {
    const albumIndex = this.albumsData.findIndex(
      (element) => element.id === albumId,
    );
    if (albumIndex === -1) {
      return undefined;
    }

    return this.favoritesData.albums.push(albumId);
  }

  async deleteAlbumFavoritesById(albumId: string) {
    const albumIndex = this.albumsData.findIndex(
      (element) => element.id === albumId,
    );
    if (albumIndex === -1) {
      return undefined;
    }

    return this.favoritesData.albums.splice(albumIndex, 1);
  }

  async addArtistToFavorites(artistId: string) {

    const artistIndex = this.artistsData.findIndex(
      (element) => element.id === artistId,
    );
    if (artistIndex === -1) {
      return undefined;
    }

    return this.favoritesData.artists.push(artistId);
  }

  async deleteArtistFavoritesById(artistId: string) {
    const artistIndex = this.artistsData.findIndex(
      (element) => element.id === artistId,
    );
    if (artistIndex === -1) {
      return undefined;
    }

    return this.favoritesData.artists.splice(artistIndex, 1);
  }
}
