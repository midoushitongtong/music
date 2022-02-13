<template>
  <!-- tab -->
  <Tab />

  <div class="container">
    <template v-if="!initDataLoading">
      <!-- banner -->
      <RecommendBanner v-if="!initDataLoading" :recommend="recommend" />
    </template>
    <!-- loading -->
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getRecommend } from '@/apis/recommend';
import { Recommend } from '@/apis/recommend/types';
import RecommendBanner from './RecommendBanner.vue';
import Loading from '@/components/loading/Loading.vue';

export default defineComponent({
  name: 'Recommend',
  components: {
    Tab,
    RecommendBanner,
    Loading,
  },
  setup() {
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
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Recommend';
</style>
