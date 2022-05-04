<template>
  <Teleport to="body">
    <Transition name="play-list">
      <div class="play-list-wrapper" v-show="visible" @click="hidePlayList">
        <div class="play-list-container" @click.stop>
          <!-- header -->
          <div class="header-container">
            <h1 class="title">
              <i class="icon" :class="icon.playMode" />
              <span class="text">{{ text.playMode }}</span>
              <span class="clear" @click="clearPlayeList">
                <i class="icon-clear" />
              </span>
            </h1>
          </div>
          <!-- content -->
          <div ref="scrollContainerRef" class="scroll-container">
            <div class="song-list" ref="songlistRef">
              <TransitionGroup name="song-list">
                <div
                  v-for="item in songList"
                  :key="item.id"
                  class="song-list-item"
                  @click="updateCurrentSong(item)"
                >
                  <i :class="['current', isCurrentPlay(item) ? 'icon-play' : '']" />
                  <span class="text">{{ item.title }}</span>
                  <span class="favorite" @click.stop="toggleFavorite(item.id)">
                    <i :class="getFavoriteIcon(item)" />
                  </span>
                  <span :class="['delete', removing && 'disable']" @click.stop="removeSong(item)">
                    <i class="icon-delete" />
                  </span>
                </div>
              </TransitionGroup>
            </div>
          </div>
          <!-- add -->
          <div class="add-container">
            <div class="add" @click="showAddSong">
              <i class="icon-add" />
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <!-- footer -->
          <div class="footer-container" @click="hidePlayList">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <ConfirmModal ref="confirmModalRef" />
</template>

<script lang="ts">
import { SongListItem } from '@/apis/song/types';
import useScroll from '@/hooks/useScroll';
import { PLAYER_FAVORITE_STORAGE_KEY, useMusicStore } from '@/store/music';
import { PLAY_MODE } from '@/store/music/types';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { remove, save } from '@/utils/array-storage';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';

export default defineComponent({
  name: 'PlayList',
  components: {
    ConfirmModal,
  },
  setup() {
    const confirmModalRef = ref();
    const visible = ref();
    const songlistRef = ref();
    const scrollContainerRef = ref();
    const { scrollInstance } = useScroll(scrollContainerRef);
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);
    const songList = computed(() => musicStore.songList);
    const playList = computed(() => musicStore.playList);
    const playing = computed(() => musicStore.playing);
    const playMode = computed(() => musicStore.playMode);
    const favoriteList = computed(() => musicStore.favoriteList);
    const icon = computed(() => ({
      playMode:
        playMode.value === PLAY_MODE.sequence
          ? 'icon-sequence'
          : playMode.value === PLAY_MODE.random
          ? 'icon-random'
          : 'icon-loop',
    }));
    const text = computed(() => ({
      playMode:
        playMode.value === PLAY_MODE.sequence
          ? '顺序播放'
          : playMode.value === PLAY_MODE.random
          ? '随机播放'
          : '循环播放',
    }));
    const removing = ref(false);

    // toggle play mode
    const togglePlayMode = () => {
      const mode = (playMode.value + 1) % 3;
      musicStore.togglePlayMode(mode);
    };

    // get current icon
    const isCurrentPlay = (songListItem: SongListItem) => {
      return currentSong.value?.id === songListItem.id;
    };

    // get favorite icon
    const getFavoriteIcon = (songListItem: SongListItem) => {
      return favoriteList.value.find((item) => item === songListItem.id)
        ? 'icon-favorite'
        : 'icon-not-favorite';
    };

    // toggle favorite
    const toggleFavorite = (id: string) => {
      let newFavoriteList = favoriteList.value;
      if (favoriteList.value.findIndex((item) => item === id) !== -1) {
        // remove
        newFavoriteList = remove(PLAYER_FAVORITE_STORAGE_KEY, (item: any) => item === id);
      } else {
        // save
        newFavoriteList = save(PLAYER_FAVORITE_STORAGE_KEY, id, (item: any) => item === id, 100);
      }
      musicStore.updateFavoriteList(newFavoriteList);
    };

    // show player list
    const showPlayList = () => {
      visible.value = true;

      // fix: 等待渲染完成才刷新
      nextTick(() => {
        // fix: 刷新 BScroll 不刷新无法正常滚动, 因为 DOM 结构已经从 display: none 切换为 display: block
        scrollInstance.value.refresh();
        // 滚动到当前歌曲
        scrollToCurrent();
      });
    };

    // hide player list
    const hidePlayList = () => {
      visible.value = false;
    };

    // scroll to current
    const scrollToCurrent = () => {
      const index = songList.value.findIndex((item) => item.id === currentSong.value?.id);
      const target = songlistRef.value?.children[index];
      if (target) {
        scrollInstance.value.scrollToElement(target, 300);
      } else {
        console.log(`获取 target 失败 index: ${index}`);
      }
    };

    // select item
    const updateCurrentSong = (songListItem: SongListItem) => {
      const index = playList.value.findIndex((item) => item.id === songListItem.id);
      musicStore.updateCurrentPlayIndex(index);
      // 更新 playing 状态
      if (!playing.value) {
        musicStore.updatePlying(true);
      }
    };

    // remove item
    const removeSong = (songListItem: SongListItem) => {
      if (removing.value) {
        return;
      }
      removing.value = true;
      // 等待动画结束, 才能继续删除
      setTimeout(() => {
        removing.value = false;
      }, 300);
      musicStore.removeSongListItem(songListItem);
    };

    // 清空播放列表
    const clearPlayeList = () => {
      confirmModalRef.value.initModal({
        description: '是否清空播放列表？',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        onConfirm: () => {
          musicStore.clearSongList();
        },
      });
    };

    // 监听切换歌曲, 更新 dom
    watch(currentSong, () => {
      if (!visible.value) {
        return;
      }
      nextTick(() => {
        // 滚动到当前歌曲
        scrollToCurrent();
      });
    });

    // 如果当前没有可播放的歌曲, 隐藏
    watch(playList, (newValue) => {
      if (newValue.length === 0) {
        hidePlayList();
      }
    });

    return {
      playList,
      songlistRef,
      visible,
      icon,
      text,
      isCurrentPlay,
      getFavoriteIcon,
      togglePlayMode,
      showPlayList,
      hidePlayList,
      scrollContainerRef,
      songList,
      updateCurrentSong,
      toggleFavorite,
      removeSong,
      removing,
      confirmModalRef,
      clearPlayeList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayList';
</style>
