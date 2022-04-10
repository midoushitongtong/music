import { SongListItem } from '@/apis/song/types';
import { shuffleArr } from '@/utils/array';
import { get } from '@/utils/array-storage';
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
  const favoriteList = ref<string[]>(get(PLAYER_FAVORITE_STORAGE_KEY));

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
    songList.value = props.songList;
    playList.value = props.songList;
    currentPlayIndex.value = props.currentPlayIndex;
    // 顺序播放模式
    playMode.value = PLAY_MODE.sequence;
    fullScreen.value = true;
  };
  const randomSongList = (_songList: typeof songList.value) => {
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
  };
});

export { useMusicStore };
