<template>
  <div class="cd-container" v-if="currentSong">
    <!-- 唱片的背景 -->
    <div class="cd-inner">
      <div ref="cdContentRef" class="cd-content">
        <img ref="cdImageRef" :class="['image', playing && 'playing']" :src="currentSong.cdImage" />
      </div>
    </div>
    <!-- 播放中的歌词 -->
    <div class="playing-lyric-container">
      <div class="playing-lyric">{{ currentLyricText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue-demi';

import { defineComponent, inject, Ref, ref, watch } from 'vue';
import { useMusicStore } from '@/store/music';
// @ts-ignore
import Lyric from '@/utils/lyric-parser';

export default defineComponent({
  name: 'PlayerCD',
  setup() {
    // 当前歌曲播放时间
    const currentTime = inject('currentTime') as Ref<number>;
    // 歌曲的歌词
    const currentLyric = inject('currentLyric') as Ref<Lyric>;
    // 歌曲的歌词 (纯音乐)
    const currentLyricWitPureMusic = inject('currentLyricWitPureMusic') as Ref<string | undefined>;

    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const playing = computed(() => musicStore.playing);
    const cdContentRef = ref<HTMLDivElement | null>(null);
    const cdImageRef = ref<HTMLImageElement | null>(null);
    // 根据歌曲播放时间, 获取当前歌词
    const currentLyricText = computed(() => {
      // 获取当前歌词 (纯音乐)
      if (currentLyricWitPureMusic.value) {
        return currentLyricWitPureMusic.value;
      }

      // 获取当前歌词
      const currentLyricLineNumber = currentLyric.value.findCurNum(currentTime.value * 1000) - 1;
      return currentLyric.value.lines[currentLyricLineNumber]?.txt;
    });

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
      currentLyricText,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerCompactDisk.scss';
</style>
