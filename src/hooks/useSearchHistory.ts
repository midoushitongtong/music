import { SEARCH_HISTORY_STORAGE_KEY, useSearchStore } from '@/store/search';
import { remove, save, clear } from '@/utils/array-storage';

const useSearchHistory = () => {
  const searchHistory = useSearchStore();

  // 保存单个搜索历史
  const saveSearchHistory = (keyword: string) => {
    // 保存到 localStorage
    const searchHistoryList = save(
      SEARCH_HISTORY_STORAGE_KEY,
      keyword,
      (item: any) => item === keyword,
      200
    );

    // 保存到 store
    searchHistory.updateSearchHistoryList(searchHistoryList);
  };

  // 删除单个搜索历史
  const removeSearchHistory = (keyword: string) => {
    // 保存到 localStorage
    const searchHistoryList = remove(SEARCH_HISTORY_STORAGE_KEY, (item: any) => item === keyword);
    // 保存到 store
    searchHistory.updateSearchHistoryList(searchHistoryList);
  };

  // 删除全部搜索历史
  const removeAllSearchHistory = () => {
    const searchHistoryList = clear(SEARCH_HISTORY_STORAGE_KEY);
    // 保存到 store
    searchHistory.updateSearchHistoryList(searchHistoryList);
  };

  return {
    saveSearchHistory,
    removeSearchHistory,
    removeAllSearchHistory,
  };
};

export default useSearchHistory;
