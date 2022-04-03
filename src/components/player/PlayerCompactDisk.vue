<template>
  <div class="middle" v-if="currentSong">
    <div class="cd-container">
      <div class="cd-inner">
        <div ref="cdContentRef" class="cd-content">
          <img
            ref="cdImageRef"
            :class="['image', playing && 'playing']"
            :src="currentSong.cdImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue-demi';

import { defineComponent, ref, watch } from 'vue';
import { useMusicStore } from '@/store/music';

export default defineComponent({
  name: 'PlayerCD',
  setup() {
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const playing = computed(() => musicStore.playing);
    const cdContentRef = ref<HTMLDivElement | null>(null);
    const cdImageRef = ref<HTMLImageElement | null>(null);

    // 同步 cdImage 的 transform 到 cdContent
    const syncTransform = () => {
      if (!cdContentRef.value || !cdImageRef.value) {
        return;
      }

      const cdContentTransform = getComputedStyle(cdContentRef.value).transform;
      const cdImageTransform = getComputedStyle(cdImageRef.value).transform;

      cdContentRef.value.style.transform =
        cdContentTransform === 'none'
          ? // 第一次的同步直接覆盖
            cdImageTransform
          : // 第一次之后的同步需要叠加
            cdContentTransform.concat(cdImageTransform);
    };

    // 监听暂停播放
    watch(playing, (newValue) => {
      if (!newValue) {
        syncTransform();
      }
    });

    return {
      currentSong,
      playing,
      cdContentRef,
      cdImageRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerCompactDisk.scss';
</style>
