<template>
  <Transition name="mini-player">
    <div class="mini-player-container" v-show="!fullScreen">
      <!-- cd -->
      <MiniPlayerCompactDisk />

      <!-- right -->
      <div class="right-container">
        <div class="title">{{ currentSong?.title }}</div>
        <div class="singer-name">{{ currentSong?.singer.name }}</div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { useMusicStore } from '@/store/music';
import { computed, defineComponent } from 'vue';
import MiniPlayerCompactDisk from './MiniPlayerCompactDisk.vue';

export default defineComponent({
  name: 'MiniPlayer',
  components: {
    MiniPlayerCompactDisk,
  },
  setup() {
    const musicStore = useMusicStore();
    const fullScreen = computed(() => musicStore.fullScreen);
    const currentSong = computed(() => musicStore.currentSong);

    return {
      fullScreen,
      currentSong,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './MiniPlayer';
</style>
