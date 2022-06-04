import { SongListItem } from '../song/types';

export type AlbumDetail = {
  id: string;
  name: string;
  image: string;
  songList: SongListItem[];
};
