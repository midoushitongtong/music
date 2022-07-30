<template>
  <div class="search-history-container" v-show="searchHistoryList.length">
    <!-- title -->
    <div class="title">
      <span class="text">搜索历史</span>
      <span class="clear" @click="clearSearchHistoryList">
        <i class="icon-clear"></i>
      </span>
    </div>

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
          <span class="icon" @click.stop="handleRemoveSearchHistory(item)">
            <i class="icon-delete"></i>
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <ConfirmModal ref="confirmModalRef" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useSearchStore } from '@/store/search';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import useSearchHistory from '@/hooks/useSearchHistory';

export default defineComponent({
  name: 'SearchHistory',
  components: {
    ConfirmModal,
  },
  emits: {
    onSelectSearchHistory: null,
  },
  setup(props, context) {
    const confirmModalRef = ref();
    const searchStore = useSearchStore();
    const searchHistoryList = computed(() => searchStore.searchHistoryList);
    const { removeSearchHistory, removeAllSearchHistory } = useSearchHistory();

    // 清空搜索历史列表
    const clearSearchHistoryList = () => {
      confirmModalRef.value.initModal({
        description: '是否清空所有搜索历史？',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        onConfirm: () => {
          removeAllSearchHistory();
        },
      });
    };

    // 删除某个搜索历史
    const handleRemoveSearchHistory = (item: string) => {
      removeSearchHistory(item);
    };

    // 按下某个搜索历史
    const handleClickSearchHistory = (item: string) => {
      context.emit('onSelectSearchHistory', item);
    };

    return {
      confirmModalRef,
      searchHistoryList,
      clearSearchHistoryList,
      handleRemoveSearchHistory,
      handleClickSearchHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SearchHistory';
</style>
