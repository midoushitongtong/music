<template>
  <div ref="scrollContainerRef" class="lyric-container scroll-container" v-if="currentSong">
    <!-- 歌词列表 -->
    <div v-if="!currentLyricPureMusic" ref="lyricListRef" class="lyric-list">
      <p
        v-for="(line, index) in currentLyric.lines"
        :key="line.num"
        :class="['text', currentLyricLineNumber === index && 'active']"
      >
        {{ line.txt }}
      </p>
    </div>
    <!-- 纯音乐 (无歌词提示) -->
    <div class="pure-music-lyric" v-show="currentLyricPureMusic">
      <p>{{ currentLyricPureMusic }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue-demi';

import { ComputedRef, defineComponent, inject, Ref, ref, watch } from 'vue';
import { useMusicStore } from '@/store/music';
// @ts-ignore
import Lyric from '@/utils/lyric-parser';
import useScroll from '@/hooks/useScroll';

export default defineComponent({
  name: 'PlayerLyric',
  setup() {
    // 当前歌曲播放时间
    const currentTime = inject('currentTime') as Ref<number>;
    // 歌曲的歌词
    const currentLyric = inject('currentLyric') as ComputedRef<Lyric>;
    // 歌曲的歌词 (纯音乐)
    const currentLyricPureMusic = inject('currentLyricPureMusic') as ComputedRef<
      string | false | undefined
    >;

    const scrollContainerRef = ref();
    const lyricListRef = ref<HTMLDivElement | null>(null);
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const { scrollInstance } = useScroll(scrollContainerRef);
    // 根据歌曲播放时间, 获取歌词行号
    const currentLyricLineNumber = computed(
      () => currentLyric.value.findCurNum(currentTime.value * 1000) - 1
    );

    // 根据歌词行号, 同步歌词滚动位置
    const updateCurrentLyricLineNumber = () => {
      if (!currentLyric.value) {
        return;
      }

      const currentLyricLineNumberTemp = currentLyricLineNumber.value;

      if (!scrollContainerRef.value || !scrollInstance.value || !lyricListRef.value) {
        return;
      }

      // 容器的一半能显示几行歌词
      const centerNumber =
        Math.floor(scrollContainerRef.value.getBoundingClientRect().height / 32 / 2) - 1;

      if (currentLyricLineNumberTemp > centerNumber) {
        // 大于 centerNumber 行, 滚动到指定的 index 元素 (为了让歌词保持在屏幕中间的位置显示)
        const line = lyricListRef.value.children[currentLyricLineNumberTemp - centerNumber];
        scrollInstance.value.scrollToElement(line, 1000);
      } else {
        // 小与等于 5 行, 滚动到顶部
        scrollInstance.value.scrollTo(0, 0, 1000);
      }
    };

    // 监听歌曲播放时间, 更新歌词行号
    watch(currentLyricLineNumber, () => {
      updateCurrentLyricLineNumber();
    });

    return {
      scrollContainerRef,
      lyricListRef,
      currentSong,
      currentLyric,
      currentLyricLineNumber,
      currentLyricPureMusic,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerLyric.scss';
</style>
