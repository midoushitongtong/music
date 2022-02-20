<template>
  <!-- tab -->
  <Tab />

  <div class="scroll-container" ref="scrollContainerRef">
    <div class="scroll-content">
      <template v-if="!initDataLoading">
        <!-- banner -->
        <RecommendBanner :recommend="recommend" />
        <!-- list -->
        <RecommendList :recommend="recommend" />
      </template>
      <!-- loading -->
      <Loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getRecommend } from '@/apis/recommend';
import { Recommend } from '@/apis/recommend/types';
import RecommendBanner from './RecommendBanner.vue';
import RecommendList from './RecommendList.vue';
import Loading from '@/components/loading/Loading.vue';
import useScroll from '@/hooks/useScroll';

export default defineComponent({
  name: 'Recommend',
  components: {
    Tab,
    RecommendBanner,
    RecommendList,
    Loading,
  },
  setup() {
    const scrollContainerRef = ref();
    useScroll(scrollContainerRef);
    const initDataLoading = ref(true);
    const recommend = ref<Recommend | null>(null);

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getRecommend();
        recommend.value = result.result;
        initDataLoading.value = false;
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    onMounted(async () => {
      await initData();
    });

    return {
      initDataLoading,
      recommend,
      scrollContainerRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Recommend';
</style>
