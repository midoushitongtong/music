import { useMusicStore } from '@/store/music';
import { computed, nextTick, Ref, watch } from 'vue';

const useScrollWrapper = (scrollInstanceRef: Ref<any>) => {
  const musicStore = useMusicStore();
  const playList = computed(() => musicStore.playList);

  // 歌曲播放列表发生变化, 刷新 scroll 因为 bottom 距离改变了
  watch(
    () => playList.value.length,
    () => {
      nextTick(() => {
        scrollInstanceRef.value.refresh();
      });
    }
  );
};

export default useScrollWrapper;
