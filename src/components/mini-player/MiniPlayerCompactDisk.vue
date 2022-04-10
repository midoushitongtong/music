<template>
  <!-- cd -->
  <div class="cd-container">
    <div class="cd-content" ref="cdContentRef" @click="openFullScreen">
      <img
        ref="cdImageRef"
        :class="['cd-image', playing && 'playing']"
        :src="currentSong?.cdImage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, watch } from 'vue';
import usePlayerCompactDisk from '@/hooks/usePlayerCompactDisk';

export default defineComponent({
  name: 'MiniPlayerCompactDisk',
  setup() {
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const playing = computed(() => musicStore.playing);
    const fullScreen = computed(() => musicStore.fullScreen);
    const { cdContentRef, cdImageRef, syncTransform } = usePlayerCompactDisk();

    // 全屏幕播放
    const openFullScreen = () => {
      musicStore.updateFullScreen(true);
    };

    // 监听暂停播放
    watch(playing, (newValue) => {
      if (!newValue && !fullScreen.value) {
        syncTransform();
      }
    });

    // 监听打开全屏
    watch(fullScreen, (newValue) => {
      if (newValue) {
        // 等待动画结束
        setTimeout(() => {
          syncTransform();
        }, 500);
      }
    });

    return {
      playing,
      cdContentRef,
      cdImageRef,
      currentSong,
      openFullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './MiniPlayerCompactDisk';
</style>
