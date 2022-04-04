<template>
  <div class="player-progress-container" v-if="currentSong">
    <!-- 歌曲当前播放时长 -->
    <span class="time time-l">{{ formatTime(currentTime) }}</span>

    <!-- 歌曲播放进度条 -->
    <div
      class="progress-bar-container"
      ref="progressBarContianerRef"
      @click="handleProgressBarContainerClick"
    >
      <div class="progress-bar">
        <div class="progress-inner" :style="progressInnerStyle" ref="progressInnerRef" />
        <div
          class="progress-button-container"
          :style="progressButtonContainerStyle"
          @touchstart.prevent="handleTouchStart"
          @touchmove.prevent="handleTouchMove"
          @touchend.prevent="handleTouchEnd"
        >
          <div class="progress-button" />
        </div>
      </div>
    </div>

    <!-- 歌曲总时长 -->
    <span class="time time-r">{{ formatTime(currentSong.duration) }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref, watch } from 'vue';
import useAudio from '@/hooks/useAudio';
import { useMusicStore } from '@/store/music';
import { formatTime } from '@/utils/time';

export default defineComponent({
  name: 'PlayerBottomProgress',
  setup() {
    // audioSelector
    const audioSelector = inject('audioSelector') as string;
    // 当前歌曲播放时间
    const currentTime = inject('currentTime') as Ref<number>;
    // 当前是否在拖拽进度条
    const progressUpdating = inject('progressUpdating') as Ref<boolean>;

    // progress button width
    const progressButtonWidth = 16;
    // touch
    const touch = {
      x1: 0,
      beginWidth: 0,
    };
    const progressInnerRef = ref<HTMLDivElement | null>(null);
    const progressBarContianerRef = ref<HTMLDivElement | null>(null);
    const audio = useAudio({
      audioSelector,
    });
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    // 进度
    const offset = ref(0);

    // progress
    const progress = computed(() => {
      return currentTime.value / (currentSong.value?.duration || 0);
    });

    // progress inner style
    const progressInnerStyle = computed(() => {
      return {
        width: `${offset.value}px`,
      };
    });

    // progress button container style
    const progressButtonContainerStyle = computed(() => {
      return {
        transform: `translate3d(${offset.value}px, 0, 0)`,
      };
    });

    // handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      if (!progressInnerRef.value) {
        return;
      }

      touch.x1 = e.touches[0].pageX;
      touch.beginWidth = progressInnerRef.value.getBoundingClientRect().width;
    };

    // handle touch move
    const handleTouchMove = (e: TouchEvent) => {
      if (!progressBarContianerRef.value || !currentSong.value) {
        return;
      }

      // 正在拖拽进度条
      progressUpdating.value = true;

      // 手势移动距离
      const distance = e.touches[0].pageX - touch.x1;

      const tempWidth = touch.beginWidth + distance;
      const progressBarWidth =
        progressBarContianerRef.value.getBoundingClientRect().width - progressButtonWidth;
      const progress = Math.min(1, Math.max(tempWidth / progressBarWidth, 0));

      // 更新 offset
      offset.value = progressBarWidth * progress;
      // 更新 currentTime
      currentTime.value = currentSong.value.duration * progress;
    };

    // handle touch end
    const handleTouchEnd = () => {
      if (!progressBarContianerRef.value || !progressInnerRef.value || !currentSong.value) {
        return;
      }

      // 拖拽进度条结束
      progressUpdating.value = false;

      const progressBarWidth =
        progressBarContianerRef.value.getBoundingClientRect().width - progressButtonWidth;
      const progress = progressInnerRef.value.getBoundingClientRect().width / progressBarWidth;

      // 更新歌曲进度
      audio.updateAttr('currentTime', currentSong.value.duration * progress);
    };

    // 点击进度条, 跳转到对应的进度
    const handleProgressBarContainerClick = (e: MouseEvent) => {
      if (!progressBarContianerRef.value || !currentSong.value) {
        return;
      }
      const rect = progressBarContianerRef.value.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      const progressBarWidth =
        progressBarContianerRef.value.getBoundingClientRect().width - progressButtonWidth;
      const progress = offsetWidth / progressBarWidth;

      // 更新歌曲进度
      audio.updateAttr('currentTime', currentSong.value.duration * progress);
    };

    // 监听 progress, 更新 offset
    watch(
      () => progress.value,
      (newValue) => {
        if (!progressBarContianerRef.value) {
          return;
        }
        const progressBarWidth =
          progressBarContianerRef.value.getBoundingClientRect().width - progressButtonWidth;
        offset.value = progressBarWidth * newValue;
      }
    );

    // 监听当前歌曲, 更新歌曲播放时间
    watch(currentSong, () => {
      if (!currentSong.value) {
        return;
      }
      // 重置歌曲播放时间
      currentTime.value = 0;
    });

    return {
      currentTime,
      progressBarContianerRef,
      progressInnerStyle,
      progressButtonContainerStyle,
      currentSong,
      formatTime,
      progress,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      progressInnerRef,
      handleProgressBarContainerClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerBottomProgress';
</style>
