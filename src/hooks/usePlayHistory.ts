import { SongListItem } from '@/apis/song/types';
import { PLAY_HISTORY_STORAGE_KEY, usePlayStore } from '@/store/play';
import { remove, saveUnshift } from '@/utils/array-storage';

const usePlayHistory = () => {
  const playHistory = usePlayStore();

  // 保存单个搜索历史
  const savePlayHistory = (songListItem: SongListItem) => {
    // 保存到 localStorage
    const playHistoryList = saveUnshift(
      PLAY_HISTORY_STORAGE_KEY,
      songListItem,
      (item: any) => item.id === songListItem.id,
      200
    );

    // 保存到 store
    playHistory.updatePlayHistoryList(playHistoryList);
  };

  // 删除单个搜索历史
  const removePlayHistory = (songListItem: SongListItem) => {
    // 保存到 localStorage
    const playHistoryList = remove(
      PLAY_HISTORY_STORAGE_KEY,
      (item: any) => item.id === songListItem.id
    );
    // 保存到 store
    playHistory.updatePlayHistoryList(playHistoryList);
  };

  return {
    savePlayHistory,
    removePlayHistory,
    playHistory,
  };
};

export default usePlayHistory;
