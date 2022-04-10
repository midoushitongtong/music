<template>
  <div class="player-bottom-container" v-if="currentSong">
    <!-- progress -->
    <PlayerProgress />

    <div class="operator-list">
      <div class="operator-list-item left">
        <i :class="icon.playMode" @click="togglePlayMode" />
      </div>
      <div class="operator-list-item left">
        <i class="icon-prev" @click="playPrev" />
      </div>
      <div class="operator-list-item center">
        <i :class="icon.play" @click="togglePlaying" />
      </div>
      <div class="operator-list-item right">
        <i class="icon-next" @click="playNext" />
      </div>
      <div class="operator-list-item right">
        <i :class="icon.favorite" @click="toggleFavorite(currentSong.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PLAYER_FAVORITE_STORAGE_KEY, useMusicStore } from '@/store/music';
import { computed, defineComponent, inject, onMounted, onUnmounted, watch } from 'vue';
import { PLAY_MODE } from '@/store/music/types';
import useAudio from '@/hooks/useAudio';
import { remove, save } from '@/utils/array-storage';
import PlayerProgress from './PlayerBottomProgress.vue';

export default defineComponent({
  name: 'PlayerBottom',
  components: {
    PlayerProgress,
  },
  setup() {
    // audioSelector
    const audioSelector = inject('audioSelector') as string;

    const audio = useAudio({
      audioSelector,
    });
    const musicStore = useMusicStore();
    const fullScreen = computed(() => musicStore.fullScreen);
    const currentSong = computed(() => musicStore.currentSong);
    const playing = computed(() => musicStore.playing);
    const playList = computed(() => musicStore.playList);
    const currentPlayIndex = computed(() => musicStore.currentPlayIndex);
    const playMode = computed(() => musicStore.playMode);
    const icon = computed(() => ({
      play: playing.value ? 'icon-pause' : 'icon-play',
      playMode:
        playMode.value === PLAY_MODE.sequence
          ? 'icon-sequence'
          : playMode.value === PLAY_MODE.random
          ? 'icon-random'
          : 'icon-loop',
      favorite: favoriteList.value.find((item) => item === currentSong.value?.id)
        ? 'icon-favorite'
        : 'icon-not-favorite',
    }));
    const favoriteList = computed(() => musicStore.favoriteList);

    // toggle playing
    const togglePlaying = () => {
      musicStore.updatePlying(!playing.value);
    };

    // toggle favorite
    const toggleFavorite = (id: string) => {
      let newFavoriteList = favoriteList.value;
      if (favoriteList.value.findIndex((item) => item === currentSong.value?.id) !== -1) {
        // remove
        newFavoriteList = remove(PLAYER_FAVORITE_STORAGE_KEY, (item: any) => item === id);
      } else {
        // save
        newFavoriteList = save(PLAYER_FAVORITE_STORAGE_KEY, id, (item: any) => item === id, 100);
      }
      musicStore.updateFavoriteList(newFavoriteList);
    };

    // play loop
    const playLoop = () => {
      // 更新歌曲进度
      audio.updateAttr('currentTime', 0);

      musicStore.updatePlying(true);
      // 开始播放 (播放结束会暂停, 重新设置为播放)
      audio.play();
    };

    // play prev
    const playPrev = () => {
      if (playList.value.length === 0) {
        // 没有可播放的歌曲, 不做任何处理
        return;
      }
      if (playList.value.length === 1) {
        // 列表中只有一首歌可以播放, 循环播放
        playLoop();
      } else {
        // 切换到上一首歌
        let newCurrentPlayIndex = currentPlayIndex.value - 1;
        if (newCurrentPlayIndex <= -1) {
          newCurrentPlayIndex = playList.value.length - 1;
        }
        musicStore.updateCurrentPlayIndex(newCurrentPlayIndex);
        // 更新 playing 状态
        if (!playing.value) {
          musicStore.updatePlying(true);
        }
      }
    };

    // play next
    const playNext = () => {
      if (playList.value.length === 0) {
        // 没有可播放的歌曲, 不做任何处理
        return;
      }
      if (playList.value.length === 1) {
        // 列表中只有一首歌可以播放, 循环播放
        playLoop();
      } else {
        // 切换到下一首歌
        let newCurrentPlayIndex = currentPlayIndex.value + 1;
        if (newCurrentPlayIndex >= playList.value.length) {
          newCurrentPlayIndex = 0;
        }
        musicStore.updateCurrentPlayIndex(newCurrentPlayIndex);
        // 更新 playing 状态
        if (!playing.value) {
          musicStore.updatePlying(true);
        }
      }
    };

    // toggle play mode
    const togglePlayMode = () => {
      const mode = (playMode.value + 1) % 3;
      musicStore.togglePlayMode(mode);
    };

    // handle ended
    const handleEnded = () => {
      // 更新歌曲播放进度
      audio.updateAttr('currentTime', 0);

      if (playMode.value === PLAY_MODE.loop) {
        playLoop();
      } else {
        playNext();
      }
    };

    // 开始播放/暂停播放, 将 playing 状态同步到 dom
    watch(playing, (newValue) => {
      if (newValue) {
        // 开始播放
        audio.play();
      } else {
        // 暂停播放
        audio.pause();
      }
    });

    onMounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.addEventListener('ended', handleEnded);
    });

    onUnmounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.removeEventListener('ended', handleEnded);
    });

    return {
      fullScreen,
      currentSong,
      playing,
      icon,
      togglePlaying,
      playPrev,
      playNext,
      togglePlayMode,
      toggleFavorite,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerBottom';
</style>
