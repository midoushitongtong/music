<template>
  <div ref="scrollContainerRef" class="lyric-container scroll-container" v-if="currentSong">
    <!-- 歌词列表 -->
    <div v-if="!currentLyricWitPureMusic" ref="lyricListRef" class="lyric-list">
      <p
        v-for="(line, index) in currentLyric.lines"
        :key="line.num"
        :class="['text', currentLyricLineNumber === index && 'active']"
      >
        {{ line.txt }}
      </p>
    </div>
    <!-- 纯音乐 (无歌词提示) -->
    <div class="pure-music-lyric" v-show="currentLyricWitPureMusic">
      <p>{{ currentLyricWitPureMusic }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject, Ref, ref, watch, computed, nextTick } from 'vue';
import { useMusicStore } from '@/store/music';
// @ts-ignore
import Lyric from '@/utils/lyric-parser';
import useScroll from '@/hooks/useScroll';

export default defineComponent({
  name: 'PlayerMiddleLyric',
  setup() {
    // 当前歌曲播放时间
    const currentTime = inject('currentTime') as Ref<number>;
    // 歌曲的歌词
    const currentLyric = inject('currentLyric') as ComputedRef<Lyric>;
    // 歌曲的歌词 (纯音乐)
    const currentLyricWitPureMusic = inject('currentLyricWitPureMusic') as ComputedRef<
      string | false | undefined
    >;

    const scrollContainerRef = ref();
    const lyricListRef = ref<HTMLDivElement | null>(null);
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const fullScreen = computed(() => musicStore.fullScreen);
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

      // 根据 fullScreen 获取 height
      let scrollContainerHegiht = scrollContainerRef.value.getBoundingClientRect().height;

      // 容器的一半能显示几行歌词
      const centerNumber = Math.floor(scrollContainerHegiht / 32 / 2) - 1;

      if (currentLyricLineNumberTemp > centerNumber) {
        // 大于 centerNumber 行, 滚动到指定的 index 元素 (为了让歌词保持在屏幕中间的位置显示)
        const line = lyricListRef.value.children[currentLyricLineNumberTemp - centerNumber];
        // fix: 当播放下一首歌曲, 第一首歌有100条歌词, 第二首歌只有50条, 第二首歌的歌词比第一首歌少, 假如 line 是空的说明不能根据 index 获取对应的歌词, 不能进行跳转
        if (line) {
          console.log(`歌词滚动, index: ${centerNumber}`);
          scrollInstance.value.scrollToElement(line, 1000);
        }
      } else {
        console.log('歌词滚动, index: 0');
        // 小与等于 5 行, 滚动到顶部
        scrollInstance.value.scrollTo(0, 0, 1000);
      }
    };

    // 监听歌词行号
    watch(currentLyricLineNumber, () => {
      updateCurrentLyricLineNumber();
    });

    // 监听 fullScreen
    watch(fullScreen, (newValue) => {
      if (newValue) {
        // fix: 等待渲染完成才刷新, 不然 getBoundingClientRect 拿不到数据
        nextTick(() => {
          // fix: 刷新 BScroll 不刷新无法正常滚动, 因为 DOM 结构已经从 display: none 切换为 display: block
          scrollInstance.value.refresh();
          updateCurrentLyricLineNumber();
        });
      }
    });

    return {
      scrollContainerRef,
      lyricListRef,
      currentSong,
      currentLyric,
      currentLyricLineNumber,
      currentLyricWitPureMusic,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerMiddleLyric.scss';
</style>
