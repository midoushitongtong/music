export type SongListItem = {
  id: string;
  // 歌名
  title: string;
  // 专辑
  album: string;
  // 歌手
  singer: {
    name: string;
  };
  // 背景图
  backgroundImage: string;
  // 唱片图
  cdImage: string;
  // 地址
  url: string;
  // 时长
  duration: number;
  // 歌词
  lyric: string;
};
