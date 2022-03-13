<template>
  <div class="slider-wrapper">
    <!-- slider container -->
    <div class="slider-container" ref="sliderContainerRef">
      <div class="slider-list">
        <div
          v-for="item in recommendDetail.sliders"
          class="slider-list-item"
          :key="item.id"
          @click="handleSliderItemClick(item)"
        >
          <img :src="item.image" class="image" />
        </div>
      </div>
    </div>
    <!-- slider indicator -->
    <div class="slider-dot-list">
      <span
        class="slider-dot-list-item"
        v-for="(item, index) in recommendDetail.sliders"
        :key="item"
        :class="[currentPageIndex === index && 'active']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { RecommendDetail } from '@/apis/recommend/types';
import useSlider from '@/hooks/useSlider';

export default defineComponent({
  name: 'RecommendBanner',
  props: {
    recommendDetail: {
      type: Object as PropType<RecommendDetail>,
      required: true,
    },
  },
  setup() {
    const sliderContainerRef = ref();
    const { currentPageIndex } = useSlider(sliderContainerRef);

    // 处理轮播点击
    const handleSliderItemClick = (item: any) => {
      window.open(item.url);
    };

    return {
      sliderContainerRef,
      currentPageIndex,
      handleSliderItemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './RecommendBanner';
</style>
