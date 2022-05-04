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
    :style="offsetStyle"
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
import { computed, defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getRecommendDetail } from '@/apis/recommend';
import { RecommendDetail } from '@/apis/recommend/types';
import RecommendBanner from './RecommendBanner.vue';
import RecommendList from './RecommendList.vue';
import useScroll from '@/hooks/useScroll';
import useScrollWrapper from '@/hooks/useScrollWrapper';
import { useMusicStore } from '@/store/music';

export default defineComponent({
  name: 'Recommend',
  components: {
    Tab,
    RecommendBanner,
    RecommendList,
  },
  setup() {
    const musicStore = useMusicStore();
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const recommendDetail = ref<RecommendDetail | null>(null);
    const { scrollInstance } = useScroll(scrollContainerRef);
    useScrollWrapper(scrollInstance);
    // 如果顶部迷你音乐播放器, 设置间距样式
    const offsetStyle = computed(() => {
      const offsetValue = musicStore.playList.length > 0 ? 60 : 0;

      return {
        bottom: `${offsetValue}px`,
      };
    });

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
      offsetStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Recommend';
</style>
