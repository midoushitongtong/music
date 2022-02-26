import { Singer } from './types';

// 歌手数据
export const getSinger = () => {
  return new Promise<{
    result: Singer;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: [
          {
            title: '热',
            singerList: [
              {
                id: '1',
                name: '周杰伦',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg',
              },
              {
                id: '2',
                name: '陈奕迅',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg',
              },
              {
                id: '3',
                name: '队长',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000002rHyN14UyyaW.jpg',
              },
              {
                id: '4',
                name: '林俊杰',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000001BLpXF2DyJe2.jpg',
              },
              {
                id: '5',
                name: '王靖雯',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000002YetSZ06c9c9.jpg',
              },
              {
                id: '6',
                name: '薛之谦',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000002J4UUk29y8BY.jpg',
              },
              {
                id: '7',
                name: '周深',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000003fA5G40k6hKc.jpg',
              },
              {
                id: '8',
                name: '莫文蔚',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000000cISVf2QqLc6.jpg',
              },
              {
                id: '9',
                name: '小阿七',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000000DT3kC3IGHjR.jpg',
              },
              {
                id: '10',
                name: '等什么君(邓寓君)',
                image: 'https://y.qq.com/music/photo_new/T001R500x500M000001B2drs3Jq4EX.jpg',
              },
            ],
          },
          {
            title: 'A',
            singerList: [
              {
                id: '11',
                name: 'Ans3',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001P8tEU0jJWXa.jpg',
              },
              {
                id: '12',
                name: 'Ac冯越聪',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000004OvqeQ2n3jpj.jpg',
              },
              {
                id: '13',
                name: 'Alex Hope',
                image: 'https://y.qq.com/music/photo_new/T001R300x300M000001eEkrw2Oskwc.jpg',
              },
              {
                id: '14',
                name: 'AKA佛',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001yObgR3ekXMq.jpg',
              },
              {
                id: '15',
                name: '$ailor',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000UNdpV0km1bE.jpg',
              },
              {
                id: '16',
                name: '阿斯巴田',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000KM4L00hT6s8.jpg',
              },
              {
                id: '17',
                name: 'AbleDaCryBoi',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000Iy3QI3mI0E8.jpg',
              },
              {
                id: '18',
                name: 'Alan吴宏盛"',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000016VBC21fLpL0.jpg',
              },
              {
                id: '19',
                name: 'A1 TRIP',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001Jm3yy0chFEt.jpg',
              },
              {
                id: '20',
                name: 'Aaron Smith',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003FM0uo4ENU9D.jpg',
              },
            ],
          },
          {
            title: 'B',
            singerList: [
              {
                id: '21',
                name: 'BIG CAD',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M00000498Bnx3SKXzg.jpg',
              },
              {
                id: '22',
                name: 'Bula',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003pkDhW3uFooR.jpg',
              },
              {
                id: '23',
                name: '白陆',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003zd6N903nqWp.jpg',
              },
              {
                id: '24',
                name: 'Bruce',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000049pctT34FObd.jpg',
              },
              {
                id: '25',
                name: '白翼实',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000HmYbR1q2jxr.jpg',
              },
              {
                id: '26',
                name: 'BEAM',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001zPTcf0sdQra.jpg',
              },
              {
                id: '27',
                name: 'BOOSIN',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003msfYx0Lgjfx.jpg',
              },
              {
                id: '28',
                name: 'baby overall',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000002gNmsZ3rzVu8.jpg',
              },
              {
                id: '29',
                name: '北海North sea',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000fw5J91srD5G.jpg',
              },
              {
                id: '30',
                name: 'Bella Poarch',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000Zsg6I00W7J7.jpg',
              },
            ],
          },
          {
            title: 'C',
            singerList: [
              {
                id: '31',
                name: 'C2T',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000002Fj2e00QXgUB.jpg',
              },
              {
                id: '32',
                name: '曹李不烦',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000002bqWoV3nl4Pw.jpg',
              },
              {
                id: '33',
                name: 'Cpray',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001m3Bit0MyCmv.jpg',
              },
              {
                id: '34',
                name: 'Cadmium',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001e5DzA2Q7Ppe.jpg',
              },
              {
                id: '35',
                name: 'Chilly',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003wV24D4eXG92.jpg',
              },
              {
                id: '36',
                name: 'Croatia Squad',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003JYcWK4fr5uC.jpg',
              },
              {
                id: '37',
                name: 'Crissin',

                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000say9I2m6Nmi.jpg',
              },
              {
                id: '38',
                name: 'Cindy大蟠桃子',

                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000QB4xT0XouPF.jpg',
              },
              {
                id: '39',
                name: 'COWBOY',

                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000038NrLT0MgtOD.jpg',
              },
              {
                id: '40',
                name: 'CentralPark',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M00000253gxx3rK9yd.jpg',
              },
            ],
          },
          {
            title: 'D',
            singerList: [
              {
                id: '41',
                name: '等一下就回家',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003OYnZ81g7rGR.jpg',
              },
              {
                id: '42',
                name: 'Dj Blyatman',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000002MlOxR4GD1hn.jpg',
              },
              {
                id: '43',
                name: '丁肆Dicey',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000002B0hKH1BboLB.jpg',
              },
              {
                id: '44',
                name: '滇声气',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003OxkZf4TCwT7.jpg',
              },
              {
                id: '45',
                name: '狄先森',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000001ZG6oF3jBday.jpg',
              },
              {
                id: '46',
                name: 'Dallas Austin (达拉斯·奥斯汀)',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003KcZcz3YHFu2.jpg',
              },
              {
                id: '47',
                name: 'Dance Monkey',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000F5ODo2qpDzt.jpg',
              },
              {
                id: '48',
                name: 'Doggie',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000043Jm6H1lIBk7.jpg',
              },
              {
                id: '49',
                name: '戴欣梦露',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003h02Ac2bnPYa.jpg',
              },
              {
                id: '50',
                name: 'Denny Roger',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000KnfJS2Usxxz.jpg',
              },
            ],
          },
          {
            title: 'E',
            singerList: [
              {
                id: '51',
                name: 'EighteenM十八',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000Pge7y1EvAXm.jpg',
              },
              {
                id: '52',
                name: 'Emo头孢',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003Og87F3yzTUj.jpg',
              },
              {
                id: '53',
                name: 'End of the World',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003va6ln3ruqsB.jpg',
              },
              {
                id: '54',
                name: 'ElyOtto',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000KpAa31JZLsx.jpg',
              },
              {
                id: '55',
                name: 'Enzo',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000sAIIO1sOXey.jpg',
              },
              {
                id: '56',
                name: 'Eric Clapton (艾力克·克莱普顿)',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000041o2yX1bmm0J.jpg',
              },
              {
                id: '57',
                name: 'Erik Satie (埃里克·萨蒂)',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000003vaXnh0BeqXh.jpg',
              },
              {
                id: '58',
                name: 'E SENS (이센스)',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000v4xeE2vHDCu.jpg',
              },
              {
                id: '59',
                name: 'Eagles',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000000WiQnt32DUS8.jpg',
              },
              {
                id: '60',
                name: 'Ed Sheeran (艾德·希兰)',
                image: 'http://y.gtimg.cn/music/photo_new/T001R150x150M0000045p4Sz0LIwL5.jpg',
              },
            ],
          },
        ],
      });
    }, 500);
  });
};
