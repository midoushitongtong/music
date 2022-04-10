<template>
  <div
    class="middle"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- compact disk -->
    <div class="compact-disk-wrapper" :style="compactDiskStyle">
      <PlayerMiddleCompactDisk />
    </div>
    <!-- lyric -->
    <div class="lyric-wrapper" :style="lyricStyle">
      <PlayerMiddleLyric />
    </div>
  </div>

  <!-- dot -->
  <div class="middle-dot-container">
    <span
      class="dot"
      :class="[currentShow === 'cd' && 'active']"
      @click="updateCurrentShow('cd')"
    ></span>
    <span
      class="dot"
      :class="[currentShow === 'lyric' && 'active']"
      @click="updateCurrentShow('lyric')"
    ></span>
  </div>
</template>

<script lang="ts">
import { emitter } from '@/utils/emitter';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import PlayerMiddleCompactDisk from './PlayerMiddleCompactDisk.vue';
import PlayerMiddleLyric from './PlayerMiddleLyric.vue';

export default defineComponent({
  name: 'PlayerMiddle',
  components: {
    PlayerMiddleCompactDisk,
    PlayerMiddleLyric,
  },
  setup() {
    const currentShow = ref<'cd' | 'lyric'>('cd');
    const compactDiskStyle = ref();
    const lyricStyle = ref();
    // touch
    const touch = {
      startX: 0,
      percentage: 0,
      currentShowTemp: currentShow.value,
      startY: 0,
      directionLocked: '',
    };

    // handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      touch.startX = e.touches[0].pageX;
      touch.startY = e.touches[0].pageY;
    };

    // hanlde touch move
    const handleTouchMove = (e: TouchEvent) => {
      const diffX = e.touches[0].pageX - touch.startX;
      const diffY = e.touches[0].pageY - touch.startY;

      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      if (!touch.directionLocked) {
        touch.directionLocked = absDiffX > absDiffY ? 'h' : 'v';
      }

      if (touch.directionLocked === 'v') {
        // 当前是垂直滑动, 不需要左右滑动的处理

        return;
      }

      const left = touch.currentShowTemp === 'cd' ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + diffX));
      touch.percentage = Math.abs(offsetWidth / window.innerWidth);

      if (touch.currentShowTemp === 'cd') {
        if (touch.percentage > 0.3) {
          currentShow.value = 'lyric';
        } else {
          currentShow.value = 'cd';
        }
      } else {
        if (touch.percentage < 0.7) {
          currentShow.value = 'cd';
        } else {
          currentShow.value = 'lyric';
        }
      }

      compactDiskStyle.value = {
        opacity: 1 - touch.percentage,
        transitionDuration: '0ms',
      };
      lyricStyle.value = {
        transform: `translate3d(${offsetWidth}px, 0, 0)`,
        transitionDuration: '0ms',
      };
    };

    // handle touch end
    const handleTouchEnd = () => {
      touch.directionLocked = '';
      let offsetWidth = 0;
      let opacity = 0;

      if (currentShow.value === 'lyric') {
        touch.currentShowTemp = 'lyric';
        offsetWidth = -innerWidth;
        opacity = 0;
      } else {
        touch.currentShowTemp = 'cd';
        offsetWidth = 0;
        opacity = 1;
      }

      compactDiskStyle.value = {
        opacity,
        transitionDuration: '233ms',
      };
      lyricStyle.value = {
        transform: `translate3d(${offsetWidth}px, 0, 0)`,
        transitionDuration: '233ms',
      };
    };

    // update curent show
    const updateCurrentShow = (newCurrentShow: typeof currentShow.value) => {
      currentShow.value = newCurrentShow;
      handleTouchEnd();
    };

    // handle open lyric
    const handleOpenLyric = () => {
      updateCurrentShow('lyric');
    };

    onMounted(() => {
      emitter.on('openLyric', handleOpenLyric);
    });

    onUnmounted(() => {
      emitter.off('openLyric', handleOpenLyric);
    });

    return {
      currentShow,
      compactDiskStyle,
      lyricStyle,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      updateCurrentShow,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerMiddle';
</style>
