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
        <!-- random play -->
        <div v-if="playHistoryList.length > 0" class="play-action-container">
          <div class="play-button" @click="handleRandomPlay">
            <i class="icon-play"></i>
            <span class="text">随机播放全部播放历史歌曲</span>
          </div>
        </div>
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
import { computed, defineComponent, ref } from 'vue';
import { usePlayStore } from '@/store/play';
import useScroll from '@/hooks/useScroll';
import { SongListItem } from '@/apis/song/types';
import { useMusicStore } from '@/store/music';
import Message from '@/components/message/Message.vue';

export default defineComponent({
  name: 'UserPlayHistory',
  components: {
    Message,
  },
  setup() {
    const messageRef = ref();
    const scrollContainerRef = ref();
    const playStore = usePlayStore();
    const musicStore = useMusicStore();
    const playHistoryList = computed(() => playStore.playHistoryList);
    useScroll(scrollContainerRef);
    // 如果顶部迷你音乐播放器, 设置间距样式
    const offsetStyle = computed(() => {
      const offsetValue = musicStore.playList.length > 0 ? 60 : 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });

    // 歌曲点击
    const handleSongClick = (item: SongListItem) => {
      musicStore.addSong(item);

      messageRef.value.show();
    };

    // handle random play
    const handleRandomPlay = () => {
      musicStore.randomSongList([...playHistoryList.value]);
    };

    return {
      scrollContainerRef,
      playHistoryList,
      offsetStyle,
      messageRef,
      handleSongClick,
      handleRandomPlay,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './UserPlayHistory';
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
