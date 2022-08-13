import { SongListItem } from '@/apis/song/types';
import { shuffleArr } from '@/utils/array';
import { get } from '@/utils/array-storage';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { PLAY_MODE } from './types';

export const PLAYER_FAVORITE_STORAGE_KEY = 'player-favorite';

const useMusicStore = defineStore('music', () => {
  // ==================================================
  // state
  // ==================================================
  // 歌曲播放列表
  const songList = ref<SongListItem[]>([]);
  // 真实的歌曲播放列表 (可能是顺序播放, 循环播放, 随机播放)
  const playList = ref<SongListItem[]>([]);
  // 是否播放中
  const playing = ref(false);
  // 播放模式
  const playMode = ref(PLAY_MODE.sequence);
  // 正在播放那首歌
  const currentPlayIndex = ref(0);
  // 全屏播放
  const fullScreen = ref(false);
  // 已收藏的歌曲列表
  const favoriteList = ref<SongListItem[]>(get(PLAYER_FAVORITE_STORAGE_KEY));

  // ==================================================
  // getters
  // ==================================================
  // 当前播放的歌曲
  const currentSong = computed<SongListItem | undefined>(() => {
    return playList.value[currentPlayIndex.value];
  });

  // ==================================================
  // actions
  // ==================================================
  const updateSongList = (_songList: typeof songList.value) => {
    songList.value = _songList;
  };
  const updatePlayList = (_playList: typeof playList.value) => {
    playList.value = _playList;
  };
  const updatePlying = (_playing: typeof playing.value) => {
    playing.value = _playing;
  };
  const updatePlayMode = (_playMode: typeof playMode.value) => {
    playMode.value = _playMode;
  };
  const updateCurrentPlayIndex = (_currentPlayIndex: typeof currentPlayIndex.value) => {
    currentPlayIndex.value = _currentPlayIndex;
  };
  const updateFullScreen = (_fullScreen: typeof fullScreen.value) => {
    fullScreen.value = _fullScreen;
  };
  const updateFavoriteList = (_favoriteList: typeof favoriteList.value) => {
    favoriteList.value = _favoriteList;
  };
  const selectPlay = (props: {
    songList: typeof songList.value;
    currentPlayIndex: typeof currentPlayIndex.value;
  }) => {
    songList.value = cloneDeep(props.songList); // 为了能强制刷新正在播放的歌曲

    playList.value = props.songList;
    currentPlayIndex.value = props.currentPlayIndex;
    // 顺序播放模式
    playMode.value = PLAY_MODE.sequence;
    fullScreen.value = true;
  };
  const randomSongList = (_songList: typeof songList.value) => {
    _songList = cloneDeep(_songList); // 为了能强制刷新正在播放的歌曲

    songList.value = _songList;
    playList.value = shuffleArr(_songList);
    currentPlayIndex.value = 0;
    // 随机播放模式
    playMode.value = PLAY_MODE.random;
    fullScreen.value = true;
  };
  const togglePlayMode = (_playMode: typeof playMode.value) => {
    const currentPlayId = currentSong.value?.id;
    let newPlayList: typeof playList.value = [];
    if (_playMode === PLAY_MODE.random) {
      newPlayList = shuffleArr(songList.value);
    } else if (_playMode === PLAY_MODE.loop) {
      newPlayList = songList.value;
    } else {
      newPlayList = songList.value;
    }
    const newCurrentPlayIndex = newPlayList.findIndex((item) => item.id === currentPlayId);
    playList.value = newPlayList;
    // 还原正在播放的 currentPlayIndex
    currentPlayIndex.value = newCurrentPlayIndex;
    playMode.value = _playMode;
  };
  const removeSongListItem = (songListItem: SongListItem) => {
    let songListTemp = songList.value;
    let playListTemp = playList.value;
    let currentPlayIndexTemp = currentPlayIndex.value;
    const songListItemIndex = playListTemp.findIndex((item) => item.id === songListItem.id);

    if (songListItemIndex === -1) {
      // 找不到这首歌不执行操作, 用户连续点击删除可能会进入到此 if
      return;
    }

    // 满足任意条件, 要让 currentPlayIndex 减 1
    // 1. 如果被删除歌曲 index 排在正在播放歌曲 index 前面
    // 2. 如果被删除歌曲 index 是最后一首
    if (songListItemIndex < currentPlayIndexTemp || songListItemIndex === playListTemp.length - 1) {
      currentPlayIndexTemp--;
    }

    // 从数组中删除歌曲
    songListTemp = songListTemp.filter((item) => item.id !== songListItem.id);
    playListTemp = playListTemp.filter((item) => item.id !== songListItem.id);

    songList.value = songListTemp;
    playList.value = playListTemp;
    currentPlayIndex.value = currentPlayIndexTemp;

    // 当删除最后一首歌, 此时列表中没有歌曲, 暂停播放歌曲
    if (playList.value.length === 0) {
      // 暂停播放
      playing.value = false;
    }
  };
  const clearSongList = () => {
    songList.value = [];
    playList.value = [];
    currentPlayIndex.value = 0;
    // 暂停播放歌曲
    playing.value = false;
  };
  const addSong = (songListItem: SongListItem) => {
    const songListTemp = cloneDeep(songList.value); // 为了能强制刷新正在播放的歌曲
    const playListTemp = cloneDeep(playList.value); // 为了能强制刷新正在播放的歌曲
    let currentPlayIndexTemp = currentPlayIndex.value;

    const playIndex = playListTemp.findIndex((item) => item.id === songListItem.id);
    // 存在列表才添加
    if (playIndex === -1) {
      playListTemp.push(songListItem);
      currentPlayIndexTemp = playListTemp.length - 1;
    } else {
      currentPlayIndexTemp = playIndex;
    }

    const songIndex = songListTemp.findIndex((item) => item.id === songListItem.id);
    // 存在列表才添加
    if (songIndex === -1) {
      songListTemp.push(songListItem);
    }

    songList.value = songListTemp;
    playList.value = playListTemp;
    currentPlayIndex.value = currentPlayIndexTemp;
    // 顺序播放模式
    playMode.value = PLAY_MODE.sequence;
    fullScreen.value = true;
  };

  return {
    songList,
    playList,
    playing,
    playMode,
    currentPlayIndex,
    fullScreen,
    currentSong,
    favoriteList,
    updateSongList,
    updatePlayList,
    updatePlying,
    updatePlayMode,
    updateCurrentPlayIndex,
    updateFullScreen,
    updateFavoriteList,
    selectPlay,
    randomSongList,
    togglePlayMode,
    removeSongListItem,
    clearSongList,
    addSong,
  };
});

export { useMusicStore };
