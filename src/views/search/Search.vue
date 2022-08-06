<template>
  <!-- tab -->
  <Tab />

  <div
    class="search-scroll-container"
    ref="scrollContainerRef"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
    :style="offsetStyle"
  >
    <div class="scroll-content">
      <template v-if="!initDataLoading">
        <!-- search input -->
        <SearchInput v-model:query="query" placeholder="搜索歌曲、歌手" />

        <div v-show="!query">
          <!-- hot keyword -->
          <div class="hot-keyword" v-show="!query">
            <div class="title">热门搜索</div>
            <div class="hot-keyword-list">
              <div
                class="hot-keyword-list-item"
                v-for="(item, index) of hotKeywordList"
                :key="index"
              >
                <div class="hot-keyword-list-item-inner" @click="updateQuery(item.keyword)">
                  <span class="keyword">{{ item.keyword }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- serch history -->
          <SearchHistory @onSelectSearchHistory="updateQuery" />
        </div>
      </template>
    </div>
  </div>

  <!-- search result -->
  <SearchSuggest v-show="query" :query="query" />

  <!-- router view -->
  <RouterView v-slot="{ Component }">
    <Transition name="singer-detail">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import SearchInput from './SearchInput.vue';
import { useMusicStore } from '@/store/music';
import useScroll from '@/hooks/useScroll';
import useScrollWrapper from '@/hooks/useScrollWrapper';
import { getHotKeywordList } from '@/apis/search';
import { HotKeywordListItem } from '@/apis/search/types';
import SearchSuggest from './SearchSuggest.vue';
import SearchHistory from './SearchHistory.vue';

export default defineComponent({
  name: 'Search',
  components: {
    Tab,
    SearchInput,
    SearchSuggest,
    SearchHistory,
  },
  setup() {
    const initDataLoading = ref(true);
    const musicStore = useMusicStore();
    const scrollContainerRef = ref();
    const { scrollInstance } = useScroll(scrollContainerRef);
    useScrollWrapper(scrollInstance);
    // 如果顶部迷你音乐播放器, 设置间距样式
    const offsetStyle = computed(() => {
      const offsetValue = musicStore.playList.length > 0 ? 60 : 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });
    const query = ref<string | undefined>(undefined);
    const hotKeywordList = ref<HotKeywordListItem[]>([]);

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getHotKeywordList();
        hotKeywordList.value = result.result;
        initDataLoading.value = false;
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    // update query
    const updateQuery = (newQuery: string) => {
      query.value = newQuery;
    };

    onMounted(async () => {
      await initData();
    });

    return {
      initDataLoading,
      scrollContainerRef,
      offsetStyle,
      query,
      hotKeywordList,
      updateQuery,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Search';
</style>
