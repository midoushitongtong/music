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
      <template v-if="!initDataLoading && recommend">
        <!-- banner -->
        <RecommendBanner :recommend="recommend" />
        <!-- list -->
        <RecommendList :recommend="recommend" />
      </template>
    </div>
  </div>

  <!-- router view -->
  <RouterView v-slot="{ Component }">
    <Transition name="recommend-detail">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getRecommend } from '@/apis/recommend';
import { Recommend } from '@/apis/recommend/types';
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
    const recommend = ref<Recommend | null>(null);
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
      offsetStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Recommend';
</style>
