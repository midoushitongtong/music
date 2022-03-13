import { SongListItem } from '../song/types';

export type SingerGroupByTitleListItem = {
  title: string;
  singerList: {
    id: string;
    name: string;
    image: string;
  }[];
};

export type SingerDetail = {
  id: string;
  name: string;
  image: string;
  songList: SongListItem[];
};
