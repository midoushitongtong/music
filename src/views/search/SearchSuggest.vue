<template>
  <div
    class="search-suggest-container"
    ref="scrollContainerRef"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
    v-noResult="{
      noResult: !initDataLoading && searchKeywordList.length === 0,
      title: '抱歉, 没有找到相关结果',
    }"
    :style="offsetStyle"
  >
    <div class="suggest-list">
      <!-- 歌手列表 -->
      <div
        class="suggest-list-item"
        v-for="item of singerList"
        :key="item.id"
        @click.stop="handleClick(item)"
      >
        <div class="icon">
          <div class="icon-mine"></div>
        </div>
        <div class="name">
          <div class="text">{{ item.singerName }}</div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div
        class="suggest-list-item"
        v-for="item of songList"
        :key="item.id"
        @click.stop="handleClick(item)"
      >
        <div class="icon">
          <div class="icon-music"></div>
        </div>
        <div class="name">
          <div class="text">{{ `${item.singerName} - ${item.songName}` }}</div>
        </div>
      </div>

      <!-- load more data laading -->
      <div
        v-if="!notMoreData"
        class="load-more-data-loading"
        v-loading="{
          loading: pullingUpLoading,
          title: '',
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { SearchKeywordListItem } from '@/apis/search/types';
import { getSearchKeywordList } from '@/apis/search';
import usePullUpLoad from '@/hooks/usePullUpLoad';
import useSearchHistory from '@/hooks/useSearchHistory';
import { useMusicStore } from '@/store/music';
import useScrollWrapper from '@/hooks/useScrollWrapper';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SearchSuggest',
  props: {
    query: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const { saveSearchHistory } = useSearchHistory();
    const router = useRouter();
    const musicStore = useMusicStore();
    // 如果顶部迷你音乐播放器, 设置间距样式
    const offsetStyle = computed(() => {
      const offsetValue = musicStore.playList.length > 0 ? 60 : 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const searchKeywordList = ref<SearchKeywordListItem[]>([]);
    const pagination = ref({
      pageNum: 1,
      pageSize: 15,
      total: 0,
    });
    const hasMoreData = computed(() => {
      return pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total;
    });
    const singerList = computed(() => {
      return searchKeywordList.value.filter((item) => item.type === 'singer');
    });
    const songList = computed(() => {
      return searchKeywordList.value.filter((item) => item.type === 'song');
    });
    const notMoreData = ref(false);

    // refresh data
    const refreshData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getSearchKeywordList({
          pageNum: pagination.value.pageNum,
          pageSize: pagination.value.pageSize,
        });
        searchKeywordList.value = result.result;
        pagination.value.total = result.total;
        notMoreData.value =
          pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total;
        initDataLoading.value = false;
        nextTick(() => {
          // 刷新 BScroll
          scrollInstance.value.refresh();
          // 结束上拉加载行为。（告诉 BScroll 准备好下一次的 pullingUp 钩子)
          scrollInstance.value.finishPullUp();
        });
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    // init data
    const initData = () => {
      pagination.value.pageNum = 1;
      pagination.value.total = 0;
      searchKeywordList.value = [];
      refreshData();
    };

    // load more data
    const handleLoadMoreData = async () => {
      if (notMoreData.value) {
        return;
      }

      try {
        pagination.value.pageNum++;
        const result = await getSearchKeywordList({
          pageNum: pagination.value.pageNum,
          pageSize: pagination.value.pageSize,
        });
        searchKeywordList.value = [...searchKeywordList.value, ...result.result];
        pagination.value.total = result.total;
        notMoreData.value =
          pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total;
        nextTick(() => {
          // 刷新 BScroll
          scrollInstance.value.refresh();
          // 结束上拉加载行为。（告诉 BScroll 准备好下一次的 pullingUp 钩子)
          scrollInstance.value.finishPullUp();
        });
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    // handle click
    const handleClick = (item: SearchKeywordListItem) => {
      if (item.type === 'song' && item.songListItem) {
        musicStore.addSong(item.songListItem);
      }

      if (item.type === 'singer') {
        router.push({
          name: 'SearchSingerDetail',
          params: {
            id: item.singerId,
          },
        });
      }

      // 保存搜索历史
      if (props.query) {
        saveSearchHistory(props.query);
      }
    };

    watch(
      () => props.query,
      (newValue) => {
        if (!newValue) {
          return;
        }
        initData();
      }
    );

    const { scrollInstance, pullingUpLoading } = usePullUpLoad(scrollContainerRef, {
      onPullingUp: handleLoadMoreData,
      otherBScrollOption: {
        // 阻止事件传递到外层 BScroll
        stopPropagation: true,
      },
    });
    useScrollWrapper(scrollInstance);

    return {
      singerList,
      songList,
      hasMoreData,
      initDataLoading,
      searchKeywordList,
      scrollContainerRef,
      notMoreData,
      pullingUpLoading,
      handleClick,
      offsetStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SearchSuggest';
</style>
