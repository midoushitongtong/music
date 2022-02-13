import { Recommend } from './types';

// 推荐数据
export const getRecommend = () => {
  return new Promise<{
    result: Recommend;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: {
          sliders: [
            {
              id: '1',
              image:
                '//y.qq.com/music/photo_new/T015R640x360M101000UlbcD169VOZ.jpg?max_age=2592000',
              url: '//y.qq.com/n/ryqq/mv/l00403os2az',
            },
            {
              id: '2',
              image:
                '//y.qq.com/music/photo_new/T015R640x360M000000vd3VG4IIgWC.jpg?max_age=2592000',
              url: 'https://y.qq.com/n/ryqq/mv/p00405v897r',
            },
            {
              id: '3',
              image:
                '//y.qq.com/music/photo_new/T015R640x360M000004Dtulm4eclbN.jpg?max_age=2592000',
              url: '//y.qq.com/n/ryqq/mv/i0040g95p26',
            },
            {
              id: '4',
              image:
                '//y.qq.com/music/photo_new/T015R640x360M000001otuno05U01N.jpg?max_age=2592000',
              url: '//y.qq.com/n/ryqq/mv/l00394xcx3v',
            },
            {
              id: '5',
              image:
                '//y.qq.com/music/photo_new/T015R640x360M000001MHGcc4MF7cF.jpg?max_age=2592000',
              url: '//y.qq.com/n/ryqq/playlist/2284181857',
            },
          ],
          albums: [
            {
              id: '1',
              image:
                '//y.qq.com/music/photo_new/T002R300x300M000001ZU0JL3YVxaz.jpg?max_age=2592000',
              title: '今',
              username: '初音未来',
            },
            {
              id: '2',
              image:
                '//y.qq.com/music/photo_new/T002R300x300M000002yQQA442FJ2U.jpg?max_age=2592000',
              title: '决心-Reloaded',
              username: '初音未来',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000004TXRQz217w8n.jpg?max_age=2592000',
              title: '수영(Swimming)',
              username: '수퍼수',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M0000038kdZJ42nhgc.jpg?max_age=2592000',
              title: 'From Art to Love',
              username: '오스틴',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000000gfYxH2YJUH9.jpg?max_age=2592000',
              title: 'Самый близкий',
              username: 'Makvin',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000002x2M2o3vE0C7.jpg?max_age=2592000',
              title: 'Hotel De Wereld',
              username: 'Lavinia Meijer',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M0000022icMw2vMV87.jpg?max_age=2592000',
              title: '我们尽力了',
              username: '张宇',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000002r73X114dr80.jpg?max_age=2592000',
              title: '踏破铁鞋',
              username: '施勤',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000000iLsDE0vtMD6.jpg?max_age=2592000',
              title: '醉春风',
              username: '王慧',
            },
            {
              id: '1',
              image: 'y.qq.com/music/photo_new/T002R300x300M000002lVygj3XOFQ8.jpg?max_age=2592000',
              title: 'π',
              username: '音融三喜',
            },
          ],
        },
      });
    }, 500);
  });
};
