import BScroll, { Options } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue';

BScroll.use(Slide);

type Props = {
  otherBScrollOption?: Options;
  disableOnMountedInit?: boolean;
};

const useSlider = (scrollContainerRef: any, props?: Props) => {
  const sliderInstance = ref();
  const currentPageIndex = ref(0);

  // handle slide page changed
  const handleSlidePageChanged = (page: any) => {
    currentPageIndex.value = page.pageX;
  };

  // init BScroll
  const initBScroll = () => {
    sliderInstance.value = new BScroll(scrollContainerRef.value, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 3,
      slide: {
        loop: true,
        interval: 5000,
      },
      click: true,
      ...props?.otherBScrollOption,
    });

    sliderInstance.value.on('slidePageChanged', handleSlidePageChanged);
  };

  onMounted(() => {
    if (!props?.disableOnMountedInit) {
      initBScroll();
    }
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
    initBScroll,
  };
};

export default useSlider;
