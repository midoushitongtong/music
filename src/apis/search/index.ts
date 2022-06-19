import { HotKeywordListItem, SearchKeywordListItem } from './types';

// 热门搜索
export const getHotKeywordList = () => {
  return new Promise<{
    result: HotKeywordListItem[];
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: [
          { keyword: 'hot keywrod 1' },
          { keyword: 'hot keywrod 2' },
          { keyword: 'hot keywrod 3' },
          { keyword: 'hot keywrod 4' },
          { keyword: 'hot keywrod 5' },
        ],
      });
    }, 500);
  });
};

// 搜索
export const getSearchKeywordList = () => {
  return new Promise<{
    result: SearchKeywordListItem[];
    total: number;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: [
          { type: 'singer', id: '1', singerName: '周杰伦' },
          { type: 'song', id: '1', singerName: '周杰伦', songName: '七里香' },
          { type: 'song', id: '2', singerName: '周杰伦', songName: '夜曲' },
          { type: 'song', id: '3', singerName: '周杰伦', songName: '晴天' },
          { type: 'song', id: '4', singerName: '周杰伦', songName: '花海' },
          { type: 'song', id: '5', singerName: '周杰伦', songName: '反方向的钟' },
          { type: 'song', id: '6', singerName: '周杰伦', songName: '稻香' },
          { type: 'song', id: '7', singerName: '周杰伦', songName: '一路向北' },
          { type: 'song', id: '8', singerName: '周杰伦', songName: '明明就' },
          { type: 'song', id: '9', singerName: '周杰伦', songName: '青花瓷' },
          { type: 'song', id: '10', singerName: '周杰伦', songName: '兰亭序' },
          { type: 'song', id: '11', singerName: '周杰伦', songName: '半岛铁盒' },
          { type: 'song', id: '12', singerName: '周杰伦', songName: '搁浅' },
          { type: 'song', id: '13', singerName: '周杰伦', songName: '烟花易冷' },
          { type: 'song', id: '14', singerName: '周杰伦', songName: '暗号' },
          { type: 'song', id: '15', singerName: '周杰伦', songName: '本草纲目' },
          { type: 'song', id: '16', singerName: '周杰伦', songName: '手写的从前' },
          { type: 'song', id: '17', singerName: '周杰伦', songName: '蒲公英的约定' },
          { type: 'song', id: '18', singerName: '周杰伦', songName: '给我一首歌的时间' },
          { type: 'song', id: '19', singerName: '周杰伦', songName: '发如雪' },
          { type: 'song', id: '20', singerName: '周杰伦', songName: '说了再见' },
          { type: 'song', id: '21', singerName: '周杰伦', songName: '告白气球' },
          { type: 'song', id: '22', singerName: '周杰伦', songName: '简单爱' },
          { type: 'song', id: '23', singerName: '周杰伦', songName: '珊瑚海' },
        ],
        total: 30,
      });
    }, 500);
  });
};
