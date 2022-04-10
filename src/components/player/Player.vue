<template>
  <div class="player-container" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <template v-if="currentSong">
        <!-- background -->
        <div class="background">
          <img :src="currentSong.backgroundImage" />
        </div>
        <!-- top -->
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back" />
          </div>
          <h1 class="title">{{ currentSong.title }}</h1>
          <h1 class="subtitle">{{ currentSong.singer.name }}</h1>
        </div>
        <!-- middle -->
        <PlayerMiddle />
        <!-- botom -->
        <PlayerBottom :audioSelector="audioSelector" />
      </template>
      <!-- audio -->
      <audio :id="audioSelector.slice(1)" />
    </div>

    <!-- mini player -->
    <MiniPlayer />
  </div>
</template>

<script lang="ts">
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import PlayerBottom from './PlayerBottom.vue';
import PlayerMiddle from './PlayerMiddle.vue';
import useAudio from '@/hooks/useAudio';
// @ts-ignore
import Lyric from '@/utils/lyric-parser';
import MiniPlayer from '../mini-player/MiniPlayer.vue';

export default defineComponent({
  name: 'Player',
  components: {
    PlayerBottom,
    PlayerMiddle,
    MiniPlayer,
  },
  setup() {
    const audioSelector = '#player-audio';
    const audio = useAudio({
      audioSelector,
    });
    const musicStore = useMusicStore();
    const playing = computed(() => musicStore.playing);
    const playList = computed(() => musicStore.playList);
    const fullScreen = computed(() => musicStore.fullScreen);
    const currentSong = computed(() => musicStore.currentSong);
    // 当前歌曲播放时间
    const currentTime = ref(0);
    // 当前是否在拖拽进度条
    const progressUpdating = ref(false);
    // 歌曲的歌词
    const currentLyric = computed(() => new Lyric(currentSong.value?.lyric || ''));
    // 歌曲的歌词 (纯音乐)
    const currentLyricWitPureMusic = computed(() => {
      const hasLyric = currentLyric.value.lines.length > 1;
      if (hasLyric) {
        // 有歌词代表不是纯音乐
        return undefined;
      }
      return currentSong.value?.lyric.replace(/\[(\d{2}):(\d{2}).(\d{2})\]/g, '');
    });

    // go back
    const goBack = () => {
      musicStore.updateFullScreen(false);
    };

    // handle pause
    // 歌曲播放结束会触发暂停事件, 同步 playing 状态
    // 电脑待机会触发暂停事件, 同步 playing 状态 (这种情况未测试)
    const handlePause = () => {
      musicStore.updatePlying(false);
    };

    // handle error
    const handleError = (error: any) => {
      console.log('视频播放失败');
      console.log(error);
    };

    // handle time update
    const handleTimeUpdate = (e: Event) => {
      if (progressUpdating.value) {
        return;
      }

      // @ts-ignore
      currentTime.value = e.target.currentTime;
    };

    // provider
    provide('audioSelector', audioSelector);
    provide('currentTime', currentTime);
    provide('progressUpdating', progressUpdating);
    provide('currentLyric', currentLyric);
    provide('currentLyricWitPureMusic', currentLyricWitPureMusic);

    // 监听切换歌曲, 更新 dom
    watch(currentSong, () => {
      if (!currentSong.value) {
        return;
      }

      // 更新歌曲地址
      audio.updateAttr('src', currentSong.value.url);
      // 更新歌曲音量
      audio.updateAttr('volume', 0.1);
      // 更新歌曲进度
      audio.updateAttr('currentTime', 0);
      // 开始播放
      audio.play();
      // 更新 playing 状态
      if (!playing.value) {
        musicStore.updatePlying(true);
      }
    });

    onMounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.addEventListener('paste', handlePause);
      audio.audioRef.value.addEventListener('error', handleError);
      audio.audioRef.value.addEventListener('timeupdate', handleTimeUpdate);
    });

    onUnmounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.removeEventListener('paste', handlePause);
      audio.audioRef.value.removeEventListener('error', handleError);
      audio.audioRef.value.removeEventListener('timeupdate', handleTimeUpdate);
    });

    return {
      audioSelector,
      fullScreen,
      currentSong,
      currentTime,
      goBack,
      handlePause,
      handleError,
      playList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Player';
</style>
