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
        <SingerList :singerGroupByTitleList="singerGroupByTitleList" />
      </template>
    </div>

    <!-- fixed title -->
    <div class="singer-fixed-title" :style="fixedStyle" v-show="currentFixedTitle">
      <div class="title">{{ currentFixedTitle }}</div>
    </div>

    <!-- shortcut -->
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>

  <!-- router view -->
  <RouterView v-slot="{ Component }">
    <Transition name="singer-detail">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import Tab from '@/components/tab/Tab.vue';
import { getSinger } from '@/apis/singer';
import { SingerGroupByTitleListItem } from '@/apis/singer/types';
import SingerList from './SingerList.vue';
import useScroll from '@/hooks/useScroll';
import useFixed from '@/hooks/useFixed';
import useShortcut from '@/hooks/useShortcut';

export default defineComponent({
  name: 'Singer',
  components: {
    Tab,
    SingerList,
  },
  setup() {
    const scrollContainerRef = ref();
    const initDataLoading = ref(true);
    const singerGroupByTitleList = ref<SingerGroupByTitleListItem[]>([]);
    const { scrollInstance } = useScroll(scrollContainerRef);
    // 当前 scroll y 位置
    const scrollY = ref(0);
    const { currentIndex, fixedStyle } = useFixed({
      groupListSelector: '.singer-group-list',
      watchData: singerGroupByTitleList,
      scrollY,
      titleHeight: 30,
    });
    // 根据 currentIndex 获取当前的 fixed title
    const currentFixedTitle = computed(() => {
      if (scrollY.value <= 0) {
        return null;
      }
      return singerGroupByTitleList.value[currentIndex.value]?.title || null;
    });
    // shortcut
    const { shortcutList, onShortcutTouchStart, onShortcutTouchMove } = useShortcut({
      groupListSelector: '.singer-group-list',
      data: singerGroupByTitleList,
      scrollInstanceRef: scrollInstance,
    });

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getSinger();
        singerGroupByTitleList.value = result.result;
        initDataLoading.value = false;
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    // handle scroll
    const handleScroll = (position: any) => {
      scrollY.value = -position.y;
    };

    onMounted(async () => {
      await initData();

      scrollInstance.value.on('scroll', handleScroll);
    });

    onUnmounted(() => {
      scrollInstance.value.off('scroll', handleScroll);
    });

    return {
      initDataLoading,
      singerGroupByTitleList,
      scrollContainerRef,
      scrollY,
      currentFixedTitle,
      fixedStyle,
      currentIndex,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Singer';
</style>
