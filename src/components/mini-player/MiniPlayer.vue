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

        <div class="control" @click.stop="showPlayList">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </div>
  </Transition>

  <!-- player list -->
  <PlayList ref="playListRef" />
</template>

<script lang="ts">
import useSlider from '@/hooks/useSlider';
import { useMusicStore } from '@/store/music';
import { computed, defineComponent, nextTick, onMounted, provide, ref, watch } from 'vue';
import MiniPlayerCompactDisk from './MiniPlayerCompactDisk.vue';
import MiniPlayerProgress from './MiniPlayerProgress.vue';
import PlayList from '@/components/play-list/PlayList.vue';
import { getSingerDetail } from '@/apis/singer';

export default defineComponent({
  name: 'MiniPlayer',
  components: {
    MiniPlayerCompactDisk,
    MiniPlayerProgress,
    PlayList,
  },
  setup() {
    const audioSelector = '#player-audio';
    const playListRef = ref();
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

    // open player list
    const showPlayList = () => {
      if (!playListRef.value?.visible) {
        playListRef.value?.showPlayList();
      } else {
        playListRef.value?.hidePlayList();
      }
    };

    // provider
    provide('audioSelector', audioSelector);

    onMounted(() => {
      // // debug 代码
      // setTimeout(async () => {
      //   const result = await getSingerDetail({ id: '1' });
      //   musicStore.selectPlay({
      //     songList: result.result.songList,
      //     currentPlayIndex: 1,
      //   });
      //   musicStore.updateFullScreen(false);
      //   playListRef.value?.showPlayList();
      // }, 500);
    });

    // 监听 currentPageIndex 更新歌曲 index
    watch(currentPageIndex, (newValue) => {
      musicStore.updateCurrentPlayIndex(newValue);
    });

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

    // 监听 playeList 刷新 BScroll (当移除了某个歌曲就会触发)
    watch(playList, (newValue) => {
      nextTick(() => {
        // 已经实例化 BScroll
        if (sliderInstance.value) {
          // fix: 只有 display: block 才刷新, 不然 BScroll 会报错
          if (sliderShow.value) {
            // fix: 只有当歌曲长度大于 0 才刷新, 不然 BScroll 会报错
            if (newValue.length > 0) {
              sliderInstance.value.refresh();
            }
          }
        }
      });
    });

    // 监听 currentPlayIndex 滚动到当前歌曲的 index
    watch(currentPlayIndex, (newValue) => {
      nextTick(() => {
        // 已经实例化 BScroll
        if (sliderInstance.value) {
          // 滚动到当前歌曲的 index
          sliderInstance.value?.goToPage(newValue, 0, 500);
        }
      });
    });

    return {
      playListRef,
      fullScreen,
      currentSong,
      playing,
      playList,
      scrollContainerRef,
      sliderShow,
      showPlayList,
      showNormalPlayer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './MiniPlayer';
</style>
