<template>
  <div class="content">
    <!-- back -->
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <!-- title -->
    <h1 class="title">{{ singerDetail.name }}</h1>
    <!-- image -->
    <div class="background-image" ref="backgroundImageRef" :style="backgroundImageContainerStyle">
      <div
        v-if="singerDetail.songList.length > 0"
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
      class="scroll-container"
      ref="scrollContainerRef"
      :style="scrollContainerStyle"
      v-noResult="{
        noResult: singerDetail.songList.length === 0,
        title: '抱歉, 没有找到此歌手相关歌曲',
      }"
    >
      <div class="scroll-content">
        <div class="song-list">
          <div
            class="song-list-item"
            v-for="item of singerDetail.songList"
            :key="item.id"
            @click="handleSongClick(item)"
          >
            <div class="name">{{ item.title }}</div>
            <div class="album">{{ item.album }}</div>
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
import { SingerDetail } from '@/apis/singer/types';
import useScroll from '@/hooks/useScroll';
import { useRouter } from 'vue-router';
import { useMusicStore } from '@/store/music';
import { SongListItem } from '@/apis/song/types';

const HEADER_HEIGHT = 45;

export default defineComponent({
  name: 'SingerDetailContent',
  props: {
    singerDetail: {
      type: Object as PropType<SingerDetail>,
      required: true,
    },
  },
  setup(props) {
    const backgroundImageRef = ref();
    const scrollContainerRef = ref();
    const backgroundImageHeight = ref(0);
    const { scrollInstance } = useScroll(scrollContainerRef);
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
        backgroundImage: `url(${props.singerDetail?.image})`,
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
      return {
        top: `${backgroundImageHeight.value}px`,
        bottom: 0,
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
        songList: props.singerDetail.songList,
        currentPlayId: item.id,
      });
    };

    // 随机播放
    const handleRandomPlay = () => {
      musicStore.randomSongList(props.singerDetail.songList);
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
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SingerDetailContent';
</style>
