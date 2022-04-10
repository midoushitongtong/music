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

  // handle slide page changed
  const handleSlidePageChanged = (page: any) => {
    currentPageIndex.value = page.pageX;
  };

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
      // click: true, 会导致执行两次
      // @ts-ignore
      tap: true,
      ...props?.otherBScrollOption,
    });

    sliderInstance.value.on('slidePageChanged', handleSlidePageChanged);
  });

  onUnmounted(() => {
    sliderInstance.value.destroy();
    sliderInstance.value.off('slidePageChanged', handleSlidePageChanged);
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
