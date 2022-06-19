import { TopList, TopListDetail } from './types';

// 推荐数据
export const getTopList = () => {
  return new Promise<{
    result: TopList;
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
                  title: '七里香',
                  singer: { name: '周杰伦' },
                },
                {
                  title: '夜曲',
                  singer: { name: '周杰伦' },
                },
                {
                  title: '晴天',
                  singer: { name: '周杰伦' },
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

// 推荐数据详情
export const getTopListDetail = (params: { id: string }) => {
  return new Promise<{
    result: TopListDetail;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        result: {
          id: '1',
          title: '飙升榜',
          image: require('@/assets/images/top-list/top-list-01.jpg'),
          songList: [
            {
              id: '1',
              title: '七里香',
              album: '七里香',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/七里香.webp'),
              cdImage: require('@/assets/images/audio/七里香.webp'),
              url: require('@/assets/audio/七里香.mp3'),
              duration: 296,
              lyric:
                '[ti:七里香]\n[ar:周杰伦]\n[al:七里香]\n[by:]\n[offset:0]\n[00:00.00]七里香 - 周杰伦 (Jay Chou)\n[00:06.93]词：方文山\n[00:13.87]曲：周杰伦\n[00:20.80]编曲：钟兴民\n[00:27.74]窗外的麻雀在电线杆上多嘴\n[00:34.49]你说这一句很有夏天的感觉\n[00:41.16]手中的铅笔在纸上来来回回\n[00:47.59]我用几行字形容你是我的谁\n[00:54.39]秋刀鱼的滋味猫跟你都想了解\n[01:01.44]初恋的香味就这样被我们寻回\n[01:07.81]那温暖的阳光像刚摘的鲜艳草莓\n[01:14.37]你说你舍不得吃掉这一种感觉\n[01:20.99]雨下整夜我的爱溢出就像雨水\n[01:27.65]院子落叶跟我的思念厚厚一叠\n[01:34.38]几句是非也无法将我的热情冷却\n[01:41.92]你出现在我诗的每一页\n[01:47.86]雨下整夜我的爱溢出就像雨水\n[01:54.60]窗台蝴蝶像诗里纷飞的美丽章节\n[02:01.38]我接着写\n[02:03.86]把永远爱你写进诗的结尾\n[02:08.99]你是我唯一想要的了解\n[02:42.02]雨下整夜我的爱溢出就像雨水\n[02:48.62]院子落叶跟我的思念厚厚一叠\n[02:55.37]几句是非也无法将我的热情冷却\n[03:02.96]你出现在我诗的每一页\n[03:09.38]那饱满的稻穗幸福了这个季节\n[03:16.54]而你的脸颊像田里熟透的番茄\n[03:22.81]你突然对我说七里香的名字很美\n[03:29.28]我此刻却只想亲吻你倔强的嘴\n[03:35.91]雨下整夜我的爱溢出就像雨水\n[03:42.58]院子落叶跟我的思念厚厚一叠\n[03:49.38]几句是非也无法将我的热情冷却\n[03:56.93]你出现在我诗的每一页\n[04:03.33]整夜我的爱溢出就像雨水\n[04:09.58]窗台蝴蝶像诗里纷飞的美丽章节\n[04:16.43]我接着写\n[04:18.97]把永远爱你写进诗的结尾\n[04:24.00]你是我唯一想要的了解',
            },
            {
              id: '2',
              title: '夜曲',
              album: '十一月的萧邦',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/夜曲.jpeg'),
              cdImage: require('@/assets/images/audio/夜曲.jpeg'),
              url: require('@/assets/audio/夜曲.flac'),
              duration: 226,
              lyric:
                '[ti:夜曲]\n[ar:周杰伦]\n[al:十一月的萧邦]\n[by:]\n[offset:0]\n[00:00.00]夜曲 - 周杰伦 (Jay Chou)\n[00:04.99]词：方文山\n[00:09.98]曲：周杰伦\n[00:14.97]编曲：林迈可\n[00:19.97]制作人：周杰伦\n[00:24.96]一群嗜血的蚂蚁 被腐肉所吸引\n[00:27.96]我面无表情 看孤独的风景\n[00:30.98]失去你 爱恨开始分明\n[00:33.47]失去你 还有什么事好关心\n[00:36.43]当鸽子不再象征和平\n[00:38.31]我终于被提醒\n[00:39.68]广场上喂食的是秃鹰\n[00:41.99]我用漂亮的押韵\n[00:43.17]形容被掠夺一空的爱情\n[00:45.50]\n[00:46.95]啊 乌云开始遮蔽 夜色不干净\n[00:49.64]公园里 葬礼的回音 在漫天飞行\n[00:52.40]送你的白色玫瑰\n[00:54.01]在纯黑的环境凋零\n[00:55.55]乌鸦在树枝上诡异的很安静\n[00:57.89]静静听 我黑色的大衣\n[01:00.34]想温暖你日渐冰冷的回忆\n[01:02.39]走过的走过的生命\n[01:03.97]啊 四周弥漫雾气\n[01:05.18]啊 我在空旷的墓地\n[01:06.57]老去后还爱你\n[01:08.04]\n[01:08.98]为你弹奏肖邦的夜曲\n[01:12.08]纪念我死去的爱情\n[01:14.37]\n[01:14.89]跟夜风一样的声音\n[01:17.56]心碎的很好听\n[01:20.38]手在键盘敲很轻\n[01:23.12]我给的思念很小心\n[01:25.89]你埋葬的地方叫幽冥\n[01:29.59]\n[01:30.10]为你弹奏肖邦的夜曲\n[01:34.16]纪念我死去的爱情\n[01:36.97]而我为你隐姓埋名\n[01:39.66]在月光下弹琴\n[01:42.48]对你心跳的感应\n[01:45.20]还是如此温热亲近\n[01:47.92]怀念你那鲜红的唇印\n[01:52.05]\n[02:15.19]那些断翅的蜻蜓 散落在这森林\n[02:18.34]而我的眼睛 没有丝毫同情\n[02:21.42]失去你 泪水混浊不清\n[02:23.81]失去你 我连笑容都有阴影\n[02:26.90]风在长满青苔的屋顶\n[02:28.67]嘲笑我的伤心\n[02:30.06]像一口没有水的枯井\n[02:32.30]我用凄美的字型\n[02:33.37]描绘后悔莫及的那爱情\n[02:36.22]\n[02:37.28]为你弹奏肖邦的夜曲\n[02:40.33]纪念我死去的爱情\n[02:43.10]跟夜风一样的声音\n[02:45.82]心碎的很好听\n[02:48.74]手在键盘敲很轻\n[02:51.36]我给的思念很小心\n[02:54.15]你埋葬的地方叫幽冥\n[02:57.66]\n[02:58.50]为你弹奏肖邦的夜曲\n[03:02.39]纪念我死去的爱情\n[03:05.21]而我为你隐姓埋名\n[03:07.92]在月光下弹琴\n[03:10.76]对你心跳的感应\n[03:13.42]还是如此温热亲近\n[03:16.24]怀念你那鲜红的唇印\n[03:20.37]\n[03:21.37]一群嗜血的蚂蚁 被腐肉所吸引\n[03:24.49]我面无表情 看孤独的风景\n[03:27.52]失去你 爱恨开始分明\n[03:29.99]失去你 还有什么事好关心\n[03:32.98]当鸽子不再象征和平\n[03:34.81]我终于被提醒\n[03:36.24]广场上喂食的是秃鹰\n[03:38.47]我用漂亮的押韵\n[03:39.68]形容被掠夺一空的爱情',
            },
            {
              id: '3',
              title: '晴天',
              album: '叶惠美',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/晴天.jpg'),
              cdImage: require('@/assets/images/audio/晴天.jpg'),
              url: require('@/assets/audio/晴天.mp3'),
              duration: 269,
              lyric:
                '[ti:晴天]\n[ar:周杰伦]\n[al:叶惠美]\n[by:]\n[offset:0]\n[00:00.00]晴天 - 周杰伦 (Jay Chou)\n[00:02.58]词：周杰伦\n[00:04.01]曲：周杰伦\n[00:05.45]编曲：周杰伦\n[00:07.17]制作人：周杰伦\n[00:09.18]合声：周杰伦\n[00:10.90]合声编写：周杰伦\n[00:13.20]吉他：蔡科俊Again\n[00:15.21]贝斯：陈任佑\n[00:16.93]鼓：陈柏州\n[00:18.36]录音助理：刘勇志\n[00:20.66]录音工程：杨瑞代（Alfa Studio）\n[00:23.82]混音工程：杨大纬（杨大纬录音工作室）\n[00:29.26]故事的小黄花\n[00:32.71]从出生那年就飘着\n[00:36.24]童年的荡秋千\n[00:39.75]随记忆一直晃到现在\n[00:42.91]Re So So Si Do Si La \n[00:45.93]So La Si Si Si Si La Si La So \n[00:49.87]吹着前奏望着天空\n[00:53.20]我想起花瓣试着掉落\n[00:56.72]为你翘课的那一天\n[00:58.83]花落的那一天\n[01:00.60]教室的那一间\n[01:02.32]我怎么看不见\n[01:04.12]消失的下雨天\n[01:05.81]我好想再淋一遍\n[01:09.99]没想到失去的勇气我还留着\n[01:16.12]好想再问一遍\n[01:17.97]你会等待还是离开\n[01:24.91]刮风这天我试过握着你手\n[01:30.45]但偏偏雨渐渐大到我看你不见\n[01:38.88]还要多久我才能在你身边\n[01:45.44]等到放晴的那天也许我会比较好一点\n[01:52.87]从前从前有个人爱你很久\n[01:58.54]但偏偏风渐渐把距离吹得好远\n[02:06.94]好不容易又能再多爱一天\n[02:13.50]但故事的最后你好像还是说了拜拜\n[02:34.90]为你翘课的那一天\n[02:36.88]花落的那一天\n[02:38.66]教室的那一间\n[02:40.39]我怎么看不见\n[02:42.15]消失的下雨天\n[02:43.87]我好想再淋一遍\n[02:48.00]没想到失去的勇气我还留着\n[02:54.15]好想再问一遍\n[02:56.03]你会等待还是离开\n[03:02.92]刮风这天我试过握着你手\n[03:08.49]但偏偏雨渐渐大到我看你不见\n[03:16.94]还要多久我才能在你身边\n[03:23.43]等到放晴的那天也许我会比较好一点\n[03:30.87]从前从前有个人爱你很久\n[03:37.14]偏偏风渐渐把距离吹得好远\n[03:44.88]好不容易又能再多爱一天\n[03:51.42]但故事的最后你好像还是说了拜拜\n[03:58.49]刮风这天我试过握着你手\n[04:01.97]但偏偏雨渐渐大到我看你不见\n[04:05.65]还要多久我才能够在你身边\n[04:09.07]等到放晴那天也许我会比较好一点\n[04:12.92]从前从前有个人爱你很久\n[04:15.91]但偏偏雨渐渐把距离吹得好远\n[04:19.38]好不容易又能再多爱一天\n[04:22.86]但故事的最后你好像还是说了拜',
            },
            {
              id: '4',
              title: '花海',
              album: '魔杰座',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/花海.jpeg'),
              cdImage: require('@/assets/images/audio/花海.jpeg'),
              url: require('@/assets/audio/花海.mp3'),
              duration: 264,
              lyric:
                "[ti:花海]\n[ar:周杰伦]\n[al:魔杰座]\n[by:]\n[offset:0]\n[00:00.00]花海 - 周杰伦 (Jay Chou)\n[00:02.47]词：古小力/黄凌嘉\n[00:04.95]曲：周杰伦\n[00:07.43]编曲：黄雨勋\n[00:09.90]制作人：周杰伦\n[00:12.38]吉他：李庭匡\n[00:14.86]录音师：杨瑞代\n[00:17.33]录音室：JVR Studio\n[00:19.81]混音师：杨大纬\n[00:22.29]混音室：杨大纬工作室\n[00:24.77]OP：JVR Music Int'l Ltd.\n[00:27.24]静止了 所有的花开\n[00:33.56]遥远了 清晰了爱\n[00:39.91]天郁闷 爱却很喜欢\n[00:46.33]那时候我不懂这叫爱\n[00:52.70]你喜欢 站在那窗台\n[00:59.02]你好久 都没再来\n[01:05.43]彩色的时间染上空白\n[01:12.80]是你流的泪晕开\n[01:17.52]不要你离开\n[01:20.72]距离隔不开\n[01:23.93]思念变成海\n[01:26.73]在窗外进不来\n[01:30.34]原谅说太快\n[01:33.55]爱成了阻碍\n[01:36.72]手中的风筝放太快回不来\n[01:43.16]不要你离开\n[01:46.28]回忆划不开\n[01:49.54]欠你的宠爱\n[01:52.36]我在等待重来\n[01:55.92]天空仍灿烂\n[01:59.07]它爱着大海\n[02:02.32]情歌被打败\n[02:05.58]爱已不存在\n[02:35.26]你喜欢 站在那窗台\n[02:41.46]你好久 都没再来\n[02:47.82]彩色的时间染上空白\n[02:55.09]是你流的泪晕开\n[02:59.88]不要你离开\n[03:03.14]距离隔不开\n[03:06.35]思念变成海\n[03:09.16]在窗外进不来\n[03:12.70]原谅说太快\n[03:15.96]爱成了阻碍\n[03:19.12]手中的风筝放太快回不来\n[03:25.48]不要你离开\n[03:28.72]回忆划不开\n[03:31.90]欠你的宠爱\n[03:34.79]我在等待重来\n[03:38.33]天空仍灿烂\n[03:41.51]它爱着大海\n[03:44.75]情歌被打败\n[03:47.94]爱已不存在",
            },
            {
              id: '5',
              title: '反方向的钟',
              album: 'Jay',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/反方向的钟.jpg'),
              cdImage: require('@/assets/images/audio/反方向的钟.jpg'),
              url: require('@/assets/audio/反方向的钟.mp3'),
              duration: 258,
              lyric:
                '[ti:反方向的钟]\n[ar:周杰伦]\n[al:Jay]\n[by:]\n[offset:0]\n[00:00.00]反方向的钟 - 周杰伦 (Jay Chou)\n[00:04.32]词：方文山\n[00:08.64]曲：周杰伦\n[00:12.96]编曲：周杰伦\n[00:17.28]合声：周杰伦\n[00:21.61]合声编写：周杰伦\n[00:25.93]ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏ\n[00:30.90]ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐ\n[00:35.93]ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏ\n[00:41.02]ㄅㄆㄇㄈㄉㄊㄋㄌ\n[00:45.85]迷迷蒙蒙 你给的梦\n[00:48.36]出现裂缝 隐隐作痛\n[00:50.93]怎么沟通你都没空\n[00:53.38]说我不懂 说了没用\n[00:55.99]他的笑容 有何不同\n[00:58.53]在你心中 我不再受宠\n[01:01.18]我的天空 是雨是风 还是彩虹\n[01:04.87]你在操纵\n[01:06.77]恨自己真的没用情绪激动\n[01:11.82]一颗心到现在还在抽痛\n[01:16.62]还为分手前那句抱歉在感动\n[01:26.68]穿梭时间的画面的钟\n[01:31.72]从反方向 开始移动\n[01:36.84]回到当初爱你的时空\n[01:41.93]停格内容 不忠\n[01:46.91]所有回忆对着我进攻\n[01:52.05]我的伤口 被你拆封\n[01:57.15]誓言太沉重泪被纵容\n[02:02.17]脸上汹涌 失控\n[02:17.39]城市霓虹 不安跳动\n[02:18.74]染红夜空 过去种种\n[02:20.20]像一场梦 不敢去碰\n[02:21.59]一想就痛 心碎内容\n[02:22.86]每一秒钟 都有不同\n[02:24.17]你不懂 连一句珍重\n[02:25.69]也有苦衷 也不想送\n[02:27.13]寒风中 废墟烟囱\n[02:28.24]停止转动 一切落空\n[02:29.60]在人海中盲目跟从\n[02:31.08]别人的梦 全面放纵\n[02:32.44]恨没有用 疗伤止痛\n[02:33.67]不再感动 没有梦\n[02:35.05]痛不知轻重\n[02:35.83]泪水鲜红 全面放纵\n[02:48.14]恨自己真的没用情绪激动\n[02:53.29]一颗心到现在还在抽痛\n[02:58.02]还为分手前那句抱歉在感动\n[03:08.19]穿梭时间的画面的钟\n[03:13.22]从反方向 开始移动\n[03:18.32]回到当初爱你的时空\n[03:23.33]停格内容 不忠\n[03:28.46]所有回忆对着我进攻\n[03:33.52]我的伤口 被你拆封\n[03:38.58]誓言太沉重泪被纵容\n[03:43.67]脸上汹涌 失控\n[03:48.72]穿梭时间的画面的钟\n[03:53.78]从反方向 开始移动\n[03:58.84]回到当初爱你的时空\n[04:03.96]停格内容 不忠\n[04:09.00]所有回忆对着我进攻',
            },
            {
              id: '6',
              title: '稻香',
              album: '魔杰座',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '7',
              title: '一路向北',
              album: 'J III MP3 Player',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '8',
              title: '明明就',
              album: '十二新作',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '9',
              title: '青花瓷',
              album: '我很忙',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '10',
              title: '兰亭序',
              album: '魔杰座',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '11',
              title: '半岛铁盒',
              album: '八度空间',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '12',
              title: '搁浅',
              album: '七里香',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '13',
              title: '烟花易冷',
              album: '跨时代',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '14',
              title: '暗号',
              album: '八度空间',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '15',
              title: '本草纲目',
              album: '依然范特西',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '16',
              title: '手写的从前',
              album: '哎哟，不错哦',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '17',
              title: '蒲公英的约定',
              album: '我很忙',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '18',
              title: '给我一首歌的时间',
              album: '摩羯座',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '19',
              title: '发如雪',
              album: '十一月的萧邦',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '20',
              title: '说了再见',
              album: '跨时代',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '21',
              title: '告白气球',
              album: '周杰伦的床边故事',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '22',
              title: '简单爱',
              album: '范特西',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
            {
              id: '23',
              title: '珊瑚海',
              album: '十一月的萧邦',
              singer: {
                name: '周杰伦',
              },
              backgroundImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              cdImage: require('@/assets/images/audio/蒲公英的约定.jpg'),
              url: require('@/assets/audio/蒲公英的约定-纯音乐.mp3'),
              duration: 28,
              lyric: '[00:00.00]此歌曲为没有填词的音乐，请您欣赏',
            },
          ],
        },
      });
    }, 500);
  });
};
