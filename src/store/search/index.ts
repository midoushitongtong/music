import { get } from '@/utils/array-storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const SEARCH_HISTORY_STORAGE_KEY = 'search-history';

const useSearchStore = defineStore('search', () => {
  // ==================================================
  // state
  // ==================================================
  // 搜索历史
  const searchHistoryList = ref<string[]>(get(SEARCH_HISTORY_STORAGE_KEY));

  // ==================================================
  // actions
  // ==================================================
  const updateSearchHistoryList = (_searchHistoryList: typeof searchHistoryList.value) => {
    searchHistoryList.value = _searchHistoryList;
  };

  return {
    searchHistoryList,
    updateSearchHistoryList,
  };
});

export { useSearchStore };
