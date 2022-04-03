<template>
  <div class="player-container">
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
        <PlayerCompactDisk />
        <!-- botom -->
        <PlayerBottom :audioSelector="audioSelector" />
      </template>
      <!-- audio -->
      <audio :id="audioSelector.slice(1)" />
    </div>
  </div>
</template>

<script lang="ts">
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, onMounted, watch } from 'vue';
import PlayerBottom from './PlayerBottom.vue';
import PlayerCompactDisk from './PlayerCompactDisk.vue';
import useAudio from '@/hooks/useAudio';

export default defineComponent({
  name: 'Player',
  components: {
    PlayerBottom,
    PlayerCompactDisk,
  },
  setup() {
    const audioSelector = '#player-audio';
    const audio = useAudio({
      audioSelector,
    });
    const musicStore = useMusicStore();
    const fullScreen = computed(() => musicStore.fullScreen);
    const currentSong = computed(() => musicStore.currentSong);

    // go back
    const goBack = () => {
      musicStore.updateFullScreen(false);
      musicStore.updatePlying(false);
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

    // 监听切换歌曲, 更新 dom
    watch([currentSong, fullScreen], () => {
      if (!currentSong.value || !fullScreen.value) {
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
    });

    onMounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.onpause = handlePause;
      audio.audioRef.value.onerror = handleError;
    });

    return {
      audioSelector,
      fullScreen,
      currentSong,
      goBack,
      handlePause,
      handleError,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Player';
</style>
