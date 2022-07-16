import { SongListItem } from '../song/types';

export type HotKeywordListItem = {
  keyword: string;
};

export type SearchKeywordListItem = {
  type: 'singer' | 'song';
  id: string;
  singerName?: string;
  songName?: string;
  songListItem?: SongListItem;
  singerId?: string;
};
