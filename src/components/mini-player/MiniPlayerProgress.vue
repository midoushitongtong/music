<template>
  <ProgressCircle :radius="30" :progress="progress">
    <i
      class="icon-mini"
      :class="[playing ? 'icon-pause-mini' : 'icon-play-mini']"
      @click.stop="togglePlay"
    />
  </ProgressCircle>
</template>

<script lang="ts">
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, inject, onMounted, onUnmounted, ref } from 'vue';
import ProgressCircle from '../progress-circle/ProgressCircle.vue';
import useAudio from '@/hooks/useAudio';

export default defineComponent({
  name: 'MiniPlayerProgress',
  components: {
    ProgressCircle,
  },
  setup() {
    // audioSelector
    const audioSelector = inject('audioSelector') as string;
    const audio = useAudio({
      audioSelector,
    });
    const musicStore = useMusicStore();
    const playing = computed(() => musicStore.playing);
    const currentSong = computed(() => musicStore.currentSong);
    // 当前歌曲播放时间
    const currentTime = ref(0);
    // progress
    const progress = computed(() => {
      return currentTime.value / (currentSong.value?.duration || 0);
    });

    // handle time update
    const handleTimeUpdate = (e: Event) => {
      // @ts-ignore
      currentTime.value = e.target.currentTime;
    };

    // toggle play
    const togglePlay = () => {
      musicStore.updatePlying(!playing.value);
    };

    onMounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.addEventListener('timeupdate', handleTimeUpdate);
    });

    onUnmounted(() => {
      if (!audio.audioRef.value) {
        return;
      }

      audio.audioRef.value.removeEventListener('timeupdate', handleTimeUpdate);
    });

    return {
      currentSong,
      progress,
      playing,
      togglePlay,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './MiniPlayerProgress';
</style>
