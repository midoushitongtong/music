import { SongListItem } from '@/apis/song/types';
import { get } from '@/utils/array-storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const PLAY_HISTORY_STORAGE_KEY = 'play-history';

const usePlayStore = defineStore('play', () => {
  // ==================================================
  // state
  // ==================================================
  // 搜索历史
  const playHistoryList = ref<SongListItem[]>(get(PLAY_HISTORY_STORAGE_KEY));

  // ==================================================
  // actions
  // ==================================================
  const updatePlayHistoryList = (_playHistoryList: typeof playHistoryList.value) => {
    playHistoryList.value = _playHistoryList;
  };

  return {
    playHistoryList,
    updatePlayHistoryList,
  };
});

export { usePlayStore };
