export type HotKeywordListItem = {
  keyword: string;
};

export type SearchKeywordListItem = {
  type: 'singer' | 'song';
  id: string;
  singerName?: string;
  songName?: string;
};
