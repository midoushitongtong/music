<template>
  <!-- tab -->
  <Tab />

  <div
    class="scroll-container"
    ref="scrollContainerRef"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
  >
    <div class="scroll-content">
      <template v-if="!initDataLoading && recommendDetail">
        <!-- banner -->
        <RecommendBanner :recommendDetail="recommendDetail" />
        <!-- list -->
        <RecommendList :recommendDetail="recommendDetail" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getRecommendDetail } from '@/apis/recommend';
import { RecommendDetail } from '@/apis/recommend/types';
import RecommendBanner from './RecommendBanner.vue';
import RecommendList from './RecommendList.vue';
import useScroll from '@/hooks/useScroll';

export default defineComponent({
  name: 'Recommend',
  components: {
    Tab,
    RecommendBanner,
    RecommendList,
  },
  setup() {
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const recommendDetail = ref<RecommendDetail | null>(null);
    useScroll(scrollContainerRef);

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getRecommendDetail();
        recommendDetail.value = result.result;
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
      recommendDetail,
      scrollContainerRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Recommend';
</style>
