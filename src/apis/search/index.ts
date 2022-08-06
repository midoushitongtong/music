import { getSingerDetail } from '../singer';
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
export const getSearchKeywordList = (params: {
  pageNum: number;
  pageSize: number;
  hideSinger?: boolean;
}) => {
  return new Promise<{
    result: SearchKeywordListItem[];
    total: number;
  }>(async (resolve) => {
    const singerDetail = await getSingerDetail({
      id: '1',
    });
    setTimeout(() => {
      let data: SearchKeywordListItem[] = [
        {
          type: 'song',
          id: '1',
          singerName: '周杰伦',
          songName: '七里香',
          songListItem: singerDetail.result.songList.find((item) => item.id === '1'),
        },
        {
          type: 'song',
          id: '2',
          singerName: '周杰伦',
          songName: '夜曲',
          songListItem: singerDetail.result.songList.find((item) => item.id === '2'),
        },
        {
          type: 'song',
          id: '3',
          singerName: '周杰伦',
          songName: '晴天',
          songListItem: singerDetail.result.songList.find((item) => item.id === '3'),
        },
        {
          type: 'song',
          id: '4',
          singerName: '周杰伦',
          songName: '花海',
          songListItem: singerDetail.result.songList.find((item) => item.id === '4'),
        },
        {
          type: 'song',
          id: '5',
          singerName: '周杰伦',
          songName: '反方向的钟',
          songListItem: singerDetail.result.songList.find((item) => item.id === '5'),
        },
        {
          type: 'song',
          id: '6',
          singerName: '周杰伦',
          songName: '稻香',
          songListItem: singerDetail.result.songList.find((item) => item.id === '6'),
        },
        {
          type: 'song',
          id: '7',
          singerName: '周杰伦',
          songName: '一路向北',
          songListItem: singerDetail.result.songList.find((item) => item.id === '7'),
        },
        {
          type: 'song',
          id: '8',
          singerName: '周杰伦',
          songName: '明明就',
          songListItem: singerDetail.result.songList.find((item) => item.id === '8'),
        },
        {
          type: 'song',
          id: '9',
          singerName: '周杰伦',
          songName: '青花瓷',
          songListItem: singerDetail.result.songList.find((item) => item.id === '9'),
        },
        {
          type: 'song',
          id: '10',
          singerName: '周杰伦',
          songName: '兰亭序',
          songListItem: singerDetail.result.songList.find((item) => item.id === '10'),
        },
        {
          type: 'song',
          id: '11',
          singerName: '周杰伦',
          songName: '半岛铁盒',
          songListItem: singerDetail.result.songList.find((item) => item.id === '11'),
        },
        {
          type: 'song',
          id: '12',
          singerName: '周杰伦',
          songName: '搁浅',
          songListItem: singerDetail.result.songList.find((item) => item.id === '12'),
        },
        {
          type: 'song',
          id: '13',
          singerName: '周杰伦',
          songName: '烟花易冷',
          songListItem: singerDetail.result.songList.find((item) => item.id === '13'),
        },
        {
          type: 'song',
          id: '14',
          singerName: '周杰伦',
          songName: '暗号',
          songListItem: singerDetail.result.songList.find((item) => item.id === '14'),
        },
        {
          type: 'song',
          id: '15',
          singerName: '周杰伦',
          songName: '本草纲目',
          songListItem: singerDetail.result.songList.find((item) => item.id === '15'),
        },
        {
          type: 'song',
          id: '16',
          singerName: '周杰伦',
          songName: '手写的从前',
          songListItem: singerDetail.result.songList.find((item) => item.id === '16'),
        },
        {
          type: 'song',
          id: '17',
          singerName: '周杰伦',
          songName: '蒲公英的约定',
          songListItem: singerDetail.result.songList.find((item) => item.id === '17'),
        },
        {
          type: 'song',
          id: '18',
          singerName: '周杰伦',
          songName: '给我一首歌的时间',
          songListItem: singerDetail.result.songList.find((item) => item.id === '18'),
        },
        {
          type: 'song',
          id: '19',
          singerName: '周杰伦',
          songName: '发如雪',
          songListItem: singerDetail.result.songList.find((item) => item.id === '19'),
        },
        {
          type: 'song',
          id: '20',
          singerName: '周杰伦',
          songName: '说了再见',
          songListItem: singerDetail.result.songList.find((item) => item.id === '20'),
        },
        {
          type: 'song',
          id: '21',
          singerName: '周杰伦',
          songName: '告白气球',
          songListItem: singerDetail.result.songList.find((item) => item.id === '21'),
        },
        {
          type: 'song',
          id: '22',
          singerName: '周杰伦',
          songName: '简单爱',
          songListItem: singerDetail.result.songList.find((item) => item.id === '22'),
        },
        {
          type: 'song',
          id: '23',
          singerName: '周杰伦',
          songName: '珊瑚海',
          songListItem: singerDetail.result.songList.find((item) => item.id === '23'),
        },
        {
          type: 'song',
          id: '24',
          singerName: '周杰伦',
          songName: '开不了口',
          songListItem: singerDetail.result.songList.find((item) => item.id === '24'),
        },
        {
          type: 'song',
          id: '25',
          singerName: '周杰伦',
          songName: '黑色幽默',
          songListItem: singerDetail.result.songList.find((item) => item.id === '25'),
        },
      ];

      if (!params.hideSinger && params.pageNum === 1) {
        data = [{ type: 'singer', id: '1', singerName: '周杰伦', singerId: '1' }, ...data];
      }

      resolve({
        result: data,
        total: 30,
      });
    }, 500);
  });
};
