<template>
  <div
    class="search-suggest-container"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
    v-noResult="{
      noResult: !initDataLoading && searchKeywordList.length === 0,
      title: '抱歉, 没有找到相关结果',
    }"
  >
    <div class="suggest-list">
      <!-- 歌手列表 -->
      <div class="suggest-list-item" v-for="item of singerList" :key="item.id">
        <div class="icon">
          <div class="icon-mine"></div>
        </div>
        <div class="name">
          <div class="text">{{ item.singerName }}</div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="suggest-list-item" v-for="item of songList" :key="item.id">
        <div class="icon">
          <div class="icon-music"></div>
        </div>
        <div class="name">
          <div class="text">{{ `${item.singerName} - ${item.songName}` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { SearchKeywordListItem } from '@/apis/search/types';
import { getSearchKeywordList } from '@/apis/search';

export default defineComponent({
  name: 'SearchSuggest',
  props: {
    query: {
      type: String,
      required: false,
    },
    showSinger: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props) {
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

    // refresh data
    const refreshData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getSearchKeywordList();
        searchKeywordList.value = result.result;
        pagination.value.total = result.total;
        initDataLoading.value = false;
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

    watch(
      () => props.query,
      (newValue) => {
        if (!newValue) {
          return;
        }
        initData();
      }
    );

    return {
      singerList,
      songList,
      hasMoreData,
      initDataLoading,
      searchKeywordList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SearchSuggest';
</style>
