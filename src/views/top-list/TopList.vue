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
      <template v-if="!initDataLoading && topList">
        <!-- list -->
        <TopListList :topList="topList" />
      </template>
    </div>
  </div>

  <!-- router view -->
  <RouterView v-slot="{ Component }">
    <Transition name="top-list-detail">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getTopList } from '@/apis/top-list';
import { TopList } from '@/apis/top-list/types';
import useScroll from '@/hooks/useScroll';
import useScrollWrapper from '@/hooks/useScrollWrapper';
import { useMusicStore } from '@/store/music';
import TopListList from './TopListList.vue';

export default defineComponent({
  name: 'TopList',
  components: {
    Tab,
    TopListList,
  },
  setup() {
    const musicStore = useMusicStore();
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const topList = ref<TopList | null>(null);
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
        const result = await getTopList();
        topList.value = result.result;
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
      topList,
      scrollContainerRef,
      offsetStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './TopList';
</style>
