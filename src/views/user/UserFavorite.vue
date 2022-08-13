<template>
  <div class="add-song-play-history-container">
    <div
      class="add-song-play-hisyory-scroll-container"
      ref="scrollContainerRef"
      :style="offsetStyle"
      v-noResult="{
        noResult: favoriteList.length === 0,
        title: '暂无收藏歌曲',
      }"
    >
      <div class="scroll-content">
        <!-- random play -->
        <div v-if="favoriteList.length > 0" class="play-action-container">
          <div class="play-button" @click="handleRandomPlay">
            <i class="icon-play"></i>
            <span class="text">随机播放全部收藏歌曲</span>
          </div>
        </div>
        <div class="song-list">
          <div
            class="song-list-item"
            v-for="item of favoriteList"
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

  <Message ref="messageRef">
    <div class="add-song-play-history-message-title">
      <i class="icon-ok"></i>
      <span class="text">1首歌曲已经添加到播放列表</span>
    </div>
  </Message>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import useScroll from '@/hooks/useScroll';
import { useMusicStore } from '@/store/music';
import Message from '@/components/message/Message.vue';
import { SongListItem } from '@/apis/song/types';

export default defineComponent({
  name: 'UserFavorite',
  components: {
    Message,
  },
  setup() {
    const messageRef = ref();
    const scrollContainerRef = ref();
    const musicStore = useMusicStore();
    const favoriteList = computed(() => musicStore.favoriteList);
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
      musicStore.randomSongList([...favoriteList.value]);
    };

    return {
      scrollContainerRef,
      favoriteList,
      offsetStyle,
      messageRef,
      handleSongClick,
      handleRandomPlay,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './UserFavorite';
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
