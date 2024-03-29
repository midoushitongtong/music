<template>
  <div class="content">
    <!-- back -->
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <!-- title -->
    <h1 class="title">{{ topListDetail.name }}</h1>
    <!-- image -->
    <div class="background-image" ref="backgroundImageRef" :style="backgroundImageContainerStyle">
      <div
        v-if="topListDetail.songList.length > 0"
        class="play-action-container"
        :style="playButtonStyle"
      >
        <div class="play-button" @click="handleRandomPlay">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="backgroundImageFilterContainerStyle"></div>
    </div>
    <!-- song list -->
    <div
      class="top-list-detail-content-scroll-container"
      ref="scrollContainerRef"
      :style="scrollContainerStyle"
      v-noResult="{
        noResult: topListDetail.songList.length === 0,
        title: '抱歉, 没有找到此歌手相关歌曲',
      }"
    >
      <div class="scroll-content">
        <div class="song-list">
          <div
            class="song-list-item"
            v-for="(item, index) of topListDetail.songList"
            :key="item.id"
            @click="handleSongClick(item)"
          >
            <div class="left">
              <span :class="getRank(index).class">
                {{ getRank(index).text }}
              </span>
            </div>
            <div class="right">
              <div class="name">{{ item.title }}</div>
              <div class="album">{{ item.album }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
} from 'vue';
import useScroll from '@/hooks/useScroll';
import { useRouter } from 'vue-router';
import { useMusicStore } from '@/store/music';
import { SongListItem } from '@/apis/song/types';
import useScrollWrapper from '@/hooks/useScrollWrapper';
import { TopListDetail } from '@/apis/top-list/types';

const HEADER_HEIGHT = 45;

export default defineComponent({
  name: 'TopListDetailContent',
  props: {
    topListDetail: {
      type: Object as PropType<TopListDetail>,
      required: true,
    },
  },
  setup(props) {
    const backgroundImageRef = ref();
    const scrollContainerRef = ref();
    const backgroundImageHeight = ref(0);
    const { scrollInstance } = useScroll(scrollContainerRef);
    useScrollWrapper(scrollInstance);
    const router = useRouter();
    const scrollY = ref(0);
    const maxTranslateY = ref(0); // 如果滚动条超过这个值, 让顶部内容覆盖列表
    const musicStore = useMusicStore();

    // background image container style
    const backgroundImageContainerStyle = computed(() => {
      const _scrollY = scrollY.value;
      const _maxTranslateY = maxTranslateY.value;
      const _backgroundImageHeight = backgroundImageHeight.value;
      let zIndex = 0;
      let paddingTop: string | number = '70%';
      let height: string | number = 0;
      let translateZ = '0px';
      let scale = 1;

      // 如果滚动条超过这个值, 让顶部内容覆盖列表
      if (_scrollY > _maxTranslateY) {
        zIndex = 9;
        paddingTop = 0;
        height = `${HEADER_HEIGHT}px`;
        translateZ = '1px';
      }

      // 滚动条往下拉, 设置背景放大效果
      if (_scrollY < 0) {
        scale = 1 + Math.abs(_scrollY / _backgroundImageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        transform: `translateZ(${translateZ}) scale(${scale})`,
        backgroundImage: `url(${props.topListDetail?.image})`,
      };
    });

    // background image filter container style
    const backgroundImageFilterContainerStyle = computed(() => {
      const _scrollY = scrollY.value;
      const _maxTranslateY = maxTranslateY.value;
      const _backgroundImageHeight = backgroundImageHeight.value;
      let blur = 0;

      if (_scrollY > 0) {
        blur =
          Math.min(_maxTranslateY / _backgroundImageHeight, _scrollY / _backgroundImageHeight) * 20;
      }

      return {
        backdropFilter: `blur(${blur}px)`,
      };
    });

    // play button style
    const playButtonStyle = computed(() => {
      const _scrollY = scrollY.value;
      const _maxTranslateY = maxTranslateY.value;
      let display = 'flex';

      if (_scrollY > _maxTranslateY) {
        display = 'none';
      }

      return {
        display,
      };
    });

    // scroll container style
    const scrollContainerStyle = computed(() => {
      // 如果顶部迷你音乐播放器, 设置间距样式
      const offsetValue = musicStore.playList.length > 0 ? 60 : 0;

      return {
        top: `${backgroundImageHeight.value}px`,
        bottom: `${offsetValue}px`,
      };
    });

    // go back
    const goBack = () => {
      router.go(-1);
    };

    // handle scroll
    const handleScroll = (position: any) => {
      scrollY.value = -position.y;
    };

    watch(
      () => backgroundImageHeight.value,
      (newValue) => {
        // backgroundImageHeight 更新后, 刷新 scroll, 因为 scroll 的高度需要根据 backgroundImageHeight 生成
        if (newValue > 0 && scrollInstance.value) {
          // nextTicket 渲染完成后刷新
          nextTick(() => {
            scrollInstance.value.refresh();
          });
        }
      }
    );

    // 歌曲点击
    const handleSongClick = (item: SongListItem) => {
      musicStore.selectPlay({
        songList: props.topListDetail.songList,
        currentPlayIndex: props.topListDetail.songList.findIndex((item2) => item2.id === item.id),
      });
    };

    // 随机播放
    const handleRandomPlay = () => {
      musicStore.randomSongList(props.topListDetail.songList);
    };

    // get rank
    const getRank = (index: number) => {
      return {
        class: index <= 2 ? `icon icon-${index + 1}` : '',
        text: index <= 2 ? '' : index + 1,
      };
    };

    onMounted(async () => {
      backgroundImageHeight.value = backgroundImageRef.value.clientHeight;
      maxTranslateY.value = backgroundImageHeight.value - HEADER_HEIGHT;

      scrollInstance.value.on('scroll', handleScroll);
    });

    onUnmounted(() => {
      scrollInstance.value.off('scroll', handleScroll);
    });

    return {
      scrollContainerRef,
      backgroundImageContainerStyle,
      backgroundImageRef,
      scrollContainerStyle,
      goBack,
      playButtonStyle,
      backgroundImageFilterContainerStyle,
      handleSongClick,
      handleRandomPlay,
      getRank,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './TopListDetailContent';
</style>
