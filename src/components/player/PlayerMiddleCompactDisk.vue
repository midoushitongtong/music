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
      <div class="playing-lyric" @click="showLyric">{{ currentLyricText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, computed, watch } from 'vue';
import { useMusicStore } from '@/store/music';
// @ts-ignore
import Lyric from '@/utils/lyric-parser';
import { emitter } from '@/utils/emitter';
import usePlayerCompactDisk from '@/hooks/usePlayerCompactDisk';

export default defineComponent({
  name: 'PlayerMiddleCompactDisk',
  setup() {
    // 当前歌曲播放时间
    const currentTime = inject('currentTime') as Ref<number>;
    // 歌曲的歌词
    const currentLyric = inject('currentLyric') as Ref<Lyric>;
    // 歌曲的歌词 (纯音乐)
    const currentLyricWitPureMusic = inject('currentLyricWitPureMusic') as Ref<string | undefined>;

    const musicStore = useMusicStore();
    const { cdContentRef, cdImageRef, syncTransform } = usePlayerCompactDisk();
    const currentSong = computed(() => musicStore.currentSong);
    const playing = computed(() => musicStore.playing);
    const fullScreen = computed(() => musicStore.fullScreen);
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

    // show lyric
    const showLyric = () => {
      emitter.emit('showLyric');
    };

    // 监听暂停播放
    watch(playing, (newValue) => {
      if (!newValue && fullScreen.value) {
        syncTransform();
      }
    });

    // 监听取消全屏
    watch(fullScreen, (newValue) => {
      if (!newValue) {
        // 等待动画结束
        setTimeout(() => {
          syncTransform();
        }, 600);
      }
    });

    return {
      currentSong,
      playing,
      cdContentRef,
      cdImageRef,
      currentLyricText,
      showLyric,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerMiddleCompactDisk.scss';
</style>
