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
      <template v-if="!initDataLoading">
        <!-- list -->
        <SingerList :singer="singer" />
      </template>
    </div>

    <!-- fixed title -->
    <div class="singer-fixed-title" :style="fixedStyle" v-show="currentFixedTitle">
      <div class="title">{{ currentFixedTitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getSinger } from '@/apis/singer';
import { Singer } from '@/apis/singer/types';
import SingerList from './SingerList.vue';
import useScroll from '@/hooks/useScroll';
import useFixed from '@/hooks/useFixed';

export default defineComponent({
  name: 'Singer',
  components: {
    Tab,
    SingerList,
  },
  setup() {
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const singer = ref<Singer | null>(null);
    const { scrollInstance } = useScroll(scrollContainerRef);
    // 当前 scroll y 位置
    const scrollY = ref(0);
    const { currentIndex, fixedStyle } = useFixed({
      groupListSelector: '.singer-group-list',
      watchData: singer,
      scrollY,
      titleHeight: 30,
    });
    // 根据 currentIndex 获取当前的 fixed title
    const currentFixedTitle = computed(() => {
      if (!singer.value) {
        return null;
      }
      if (scrollY.value <= 0) {
        return null;
      }
      return singer.value[currentIndex.value]?.title || null;
    });

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getSinger();
        singer.value = result.result;
        initDataLoading.value = false;
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    onMounted(async () => {
      await initData();

      scrollInstance.value.on('scroll', (position: any) => {
        scrollY.value = -position.y;
      });
    });

    return {
      initDataLoading,
      singer,
      scrollContainerRef,
      scrollY,
      currentFixedTitle,
      fixedStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Singer';
</style>
