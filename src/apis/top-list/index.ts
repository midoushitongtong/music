import { TopListDetail } from './types';

// 推荐数据
export const getTopListDetail = () => {
  return new Promise<{
    result: TopListDetail;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: {
          topList: [
            {
              id: '1',
              title: '飙升榜',
              image: require('@/assets/images/top-list/top-list-01.jpg'),
              songList: [
                {
                  title: '你曾是少年',
                  singer: { name: 'S.H.E' },
                },
                {
                  title: '开始懂了',
                  singer: { name: '孙燕姿' },
                },
                {
                  title: 'DON QUIXOTE',
                  singer: { name: 'SEVENTEEN (세븐틴)' },
                },
              ],
            },
            {
              id: '2',
              title: '热歌榜',
              image: require('@/assets/images/top-list/top-list-02.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '3',
              title: '新歌榜',
              image: require('@/assets/images/top-list/top-list-03.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '4',
              title: '流行指数榜',
              image: require('@/assets/images/top-list/top-list-04.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '5',
              title: '听歌识曲榜',
              image: require('@/assets/images/top-list/top-list-05.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '6',
              title: '内地榜',
              image: require('@/assets/images/top-list/top-list-06.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '7',
              title: '香港地区榜',
              image: require('@/assets/images/top-list/top-list-07.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '8',
              title: '台湾地区榜',
              image: require('@/assets/images/top-list/top-list-08.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '9',
              title: '欧美榜',
              image: require('@/assets/images/top-list/top-list-09.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '10',
              title: '韩国榜',
              image: require('@/assets/images/top-list/top-list-10.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '11',
              title: '日本榜',
              image: require('@/assets/images/top-list/top-list-11.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '12',
              title: 'DJ舞曲榜',
              image: require('@/assets/images/top-list/top-list-12.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '13',
              title: '综艺新歌榜',
              image: require('@/assets/images/top-list/top-list-13.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '14',
              title: '影视金曲榜',
              image: require('@/assets/images/top-list/top-list-14.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
            {
              id: '15',
              title: '达人音乐榜',
              image: require('@/assets/images/top-list/top-list-15.jpg'),
              songList: [
                {
                  title: '爱你',
                  singer: { name: '王心凌' },
                },
                {
                  title: 'Letting Go',
                  singer: { name: '蔡健雅' },
                },
                {
                  title: '第一次爱的人',
                  singer: { name: '王心凌' },
                },
              ],
            },
          ],
        },
      });
    }, 500);
  });
};
