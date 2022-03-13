import { SongListItem } from '@/apis/song/types';
import { shuffleArr } from '@/utils/array';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { PLAY_MODE } from './types';

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
  const currentPlayId = ref('');
  // 全屏播放
  const fullScreen = ref(false);

  // ==================================================
  // getters
  // ==================================================
  // 当前播放的歌曲
  const currentSong = computed(() => {
    return playList.value.find((item) => item.id === currentPlayId.value);
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
  const updateCurrentPlayId = (_currentPlayId: typeof currentPlayId.value) => {
    currentPlayId.value = _currentPlayId;
  };
  const updateFullScreen = (_fullScreen: typeof fullScreen.value) => {
    fullScreen.value = _fullScreen;
  };
  const selectPlay = (props: {
    songList: typeof songList.value;
    currentPlayId: typeof currentPlayId.value;
  }) => {
    songList.value = props.songList;
    playList.value = props.songList;
    currentPlayId.value = props.currentPlayId;
    // 顺序播放模式
    playMode.value = PLAY_MODE.sequence;
    fullScreen.value = true;
    playing.value = true;
  };
  const randomSongList = (_songList: typeof songList.value) => {
    songList.value = _songList;
    playList.value = shuffleArr(_songList);
    currentPlayId.value = playList.value[0].id;
    // 随机播放模式
    playMode.value = PLAY_MODE.random;
    fullScreen.value = true;
    playing.value = true;
  };

  return {
    songList,
    playList,
    playing,
    playMode,
    currentPlayId,
    fullScreen,
    currentSong,
    updateSongList,
    updatePlayList,
    updatePlying,
    updatePlayMode,
    updateCurrentPlayId,
    updateFullScreen,
    selectPlay,
    randomSongList,
  };
});

export { useMusicStore };
