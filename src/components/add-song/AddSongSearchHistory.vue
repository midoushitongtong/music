<template>
  <div class="add-song-search-history-container">
    <div
      class="add-song-search-hisyory-scroll-container"
      ref="scrollContainerRef"
      :style="offsetStyle"
      v-noResult="{
        noResult: searchHistoryList.length === 0,
        title: '暂无歌曲播放历史',
      }"
    >
      <div class="scroll-content">
        <!-- list -->
        <TransitionGroup name="search-history-list" tag="div" class="search-history-list">
          <div
            class="search-history-list-item"
            v-for="item of searchHistoryList"
            :key="item"
            @click="handleClickSearchHistory(item)"
          >
            <div class="search-history-list-item-inner">
              <span class="text">{{ item }}</span>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useSearchStore } from '@/store/search';
import useScroll from '@/hooks/useScroll';
import { emitter } from '@/utils/emitter';

export default defineComponent({
  name: 'AddSongSearchHistory',
  emits: {
    onSelectSearchHistory: null,
  },
  setup(props, context) {
    const scrollContainerRef = ref();
    const searchStore = useSearchStore();
    const searchHistoryList = computed(() => searchStore.searchHistoryList);
    const { scrollInstance } = useScroll(scrollContainerRef);
    const offsetStyle = computed(() => {
      const offsetValue = 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });

    // 按下某个搜索历史
    const handleClickSearchHistory = (item: string) => {
      context.emit('onSelectSearchHistory', item);
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
      offsetStyle,
      searchHistoryList,
      handleClickSearchHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './AddSongSearchHistory';
</style>
