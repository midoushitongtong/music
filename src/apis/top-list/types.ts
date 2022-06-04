export type TopListDetail = {
  topList: {
    id: string;
    // 分类图片
    image: string;
    // 分类名称
    title: string;
    songList: {
      // 歌曲
      title: string;
      // 歌手
      singer: {
        name: string;
      };
    }[];
  }[];
};
