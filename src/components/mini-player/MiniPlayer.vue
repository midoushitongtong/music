<template>
  <Transition name="mini-player">
    <div class="mini-player-container" v-show="sliderShow" @click="showNormalPlayer">
      <!-- left -->
      <div class="left-container">
        <MiniPlayerCompactDisk />
      </div>

      <!-- middle -->
      <div class="middle-container">
        <div ref="scrollContainerRef" class="slider-container">
          <div class="slider-content">
            <div class="slider-list-item" v-for="item of playList" :key="item.id">
              <div class="title">{{ item?.title }}</div>
              <div class="singer-name">{{ item?.singer.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- right -->
      <div class="right-container">
        <div class="control">
          <MiniPlayerProgress />
        </div>

        <!-- 
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div> -->
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import useSlider from '@/hooks/useSlider';
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, nextTick, provide, ref, watch } from 'vue';
import MiniPlayerCompactDisk from './MiniPlayerCompactDisk.vue';
import MiniPlayerProgress from './MiniPlayerProgress.vue';

export default defineComponent({
  name: 'MiniPlayer',
  components: {
    MiniPlayerCompactDisk,
    MiniPlayerProgress,
  },
  setup() {
    const audioSelector = '#player-audio';
    const musicStore = useMusicStore();
    const fullScreen = computed(() => musicStore.fullScreen);
    const playing = computed(() => musicStore.playing);
    const currentSong = computed(() => musicStore.currentSong);
    const playList = computed(() => musicStore.playList);
    const currentPlayIndex = computed(() => musicStore.currentPlayIndex);
    const sliderShow = computed(() => !fullScreen.value && playList.value.length > 0);
    const scrollContainerRef = ref();
    const { sliderInstance, initBScroll, currentPageIndex } = useSlider(scrollContainerRef, {
      disableOnMountedInit: true,
      otherBScrollOption: {
        slide: {
          loop: true,
          autoplay: false,
        },
      },
    });

    // 全屏幕播放
    const showNormalPlayer = () => {
      musicStore.updateFullScreen(true);
    };

    // provider
    provide('audioSelector', audioSelector);

    // 监听 sliderShow 初始化 BScroll
    watch(sliderShow, (newValue) => {
      if (newValue) {
        nextTick(() => {
          if (!sliderInstance.value) {
            // 还未初始化先初始化
            initBScroll();
          } else {
            // 已初始化就刷新
            sliderInstance.value.refresh();
          }

          // 滚动到当前歌曲的 index
          sliderInstance.value?.goToPage(currentPlayIndex.value, 0, 500);
        });
      }
    });

    // 监听 currentPlayIndex 滚动到当前歌曲的 index
    watch(currentPlayIndex, (newValue) => {
      // 已经实例化 BScroll
      if (sliderInstance.value) {
        // 滚动到当前歌曲的 index
        sliderInstance.value?.goToPage(newValue, 0, 500);
      }
    });

    // 监听 currentPageIndex 更新歌曲 index
    watch(currentPageIndex, (newValue) => {
      musicStore.updateCurrentPlayIndex(newValue);
    });

    return {
      fullScreen,
      currentSong,
      playing,
      playList,
      showNormalPlayer,
      scrollContainerRef,
      sliderShow,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './MiniPlayer';
</style>
