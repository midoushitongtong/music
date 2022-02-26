import BScroll, { Options } from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue';

BScroll.use(ObserveDOM);

type Props = {
  otherBScrollOption?: Options;
};

const useScroll = (scrollContainerRef: any, props?: Props) => {
  const scrollInstance = ref();

  onMounted(() => {
    scrollInstance.value = new BScroll(scrollContainerRef.value, {
      click: true,
      // @ts-ignore
      tap: true,
      scrollX: false,
      scrollY: true,
      observeDOM: true, // 开启 observe-dom 插件,
      probeType: 3,
      ...props?.otherBScrollOption,
    });
  });

  onUnmounted(() => {
    scrollInstance.value.destroy();
  });

  // 搭配 keep-alive 使用
  onActivated(() => {
    scrollInstance.value.enable();
    scrollInstance.value.refresh();
  });

  // 搭配 keep-alive 使用
  onDeactivated(() => {
    scrollInstance.value.disable();
  });

  return {
    scrollInstance,
  };
};

export default useScroll;
