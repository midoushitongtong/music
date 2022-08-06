<template>
  <div class="add-song-play-history-container">
    <div
      class="add-song-play-hisyory-scroll-container"
      ref="scrollContainerRef"
      :style="offsetStyle"
      v-noResult="{
        noResult: playHistoryList.length === 0,
        title: '暂无歌曲播放历史',
      }"
    >
      <div class="scroll-content">
        <div class="song-list">
          <div
            class="song-list-item"
            v-for="item of playHistoryList"
            :key="item.id"
            @click="handleSongClick(item)"
          >
            <div class="name">{{ item.title }}</div>
            <div class="album">{{ item.album }}</div>
          </div>
        </div>
      </div>
    </div>

    <Message ref="messageRef">
      <div class="add-song-play-history-message-title">
        <i class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </Message>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { usePlayStore } from '@/store/play';
import useScroll from '@/hooks/useScroll';
import { SongListItem } from '@/apis/song/types';
import { useMusicStore } from '@/store/music';
import { emitter } from '@/utils/emitter';
import Message from '@/components/message/Message.vue';

export default defineComponent({
  name: 'AddSongPlayHistory',
  components: {
    Message,
  },
  setup() {
    const messageRef = ref();
    const scrollContainerRef = ref();
    const playStore = usePlayStore();
    const musicStore = useMusicStore();
    const playHistoryList = computed(() => playStore.playHistoryList);
    const { scrollInstance } = useScroll(scrollContainerRef);
    const offsetStyle = computed(() => {
      const offsetValue = 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });

    // 歌曲点击
    const handleSongClick = (item: SongListItem) => {
      musicStore.addSong(item);

      messageRef.value.show();
    };

    // 刷新 BScroll
    const refreshBScroll = () => {
      nextTick(() => {
        scrollInstance.value.refresh();
      });
    };

    onMounted(() => {
      emitter.on('addSongRefreshScrollContainer', refreshBScroll);
    });

    onUnmounted(() => {
      emitter.off('addSongRefreshScrollContainer', refreshBScroll);
    });

    return {
      scrollContainerRef,
      playHistoryList,
      offsetStyle,
      handleSongClick,
      messageRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './AddSongPlayHistory';
</style>

<style lang="scss">
@import '@/assets/scss/variable';
.add-song-play-history-message-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  .icon-ok {
    font-size: $font-size-medium;
    color: $color-theme;
    margin-right: 0.5rem;
  }
  .text {
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
