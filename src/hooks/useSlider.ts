import BScroll, { Options } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue';

BScroll.use(Slide);

type Props = {
  otherBScrollOption?: Options;
};

const useSlider = (scrollContainerRef: any, props?: Props) => {
  const sliderInstance = ref();
  const currentPageIndex = ref(0);

  onMounted(() => {
    sliderInstance.value = new BScroll(scrollContainerRef.value, {
      scrollX: true,
      scrollY: false,
      slide: true,
      loop: true,
      momentum: false,
      bounce: false,
      probeType: 3,
      interval: 5000,
      click: true,
      // @ts-ignore
      tap: true,
      ...props?.otherBScrollOption,
    });

    sliderInstance.value.on('slidePageChanged', (page: any) => {
      currentPageIndex.value = page.pageX;
    });
  });

  onUnmounted(() => {
    sliderInstance.value.destroy();
  });

  // 搭配 keep-alive 使用
  onActivated(() => {
    sliderInstance.value.enable();
    sliderInstance.value.refresh();
  });

  // 搭配 keep-alive 使用
  onDeactivated(() => {
    sliderInstance.value.disable();
  });

  return {
    sliderInstance,
    currentPageIndex,
  };
};

export default useSlider;
