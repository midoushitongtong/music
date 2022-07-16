import BScroll, { Options } from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import PullUp from '@better-scroll/pull-up';
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue';

BScroll.use(ObserveDOM);
BScroll.use(PullUp);

type Props = {
  onPullingUp: () => void;
  otherBScrollOption?: Options;
};

const useScroll = (scrollContainerRef: any, props: Props) => {
  const scrollInstance = ref();
  const pullingUpLoading = ref(false);

  // 处理 pulling up
  const handlePullingUp = async () => {
    try {
      pullingUpLoading.value = true;
      await props.onPullingUp();
    } finally {
      pullingUpLoading.value = false;
    }
  };

  onMounted(() => {
    scrollInstance.value = new BScroll(scrollContainerRef.value, {
      click: true,
      // @ts-ignore
      tap: true,
      scrollX: false,
      scrollY: true,
      observeDOM: true, // 开启 observe-dom 插件
      probeType: 3,
      pullUpLoad: true, // 开启 pull-up 插件
      ...props?.otherBScrollOption,
    });

    scrollInstance.value.on('pullingUp', handlePullingUp);
  });

  onUnmounted(() => {
    scrollInstance.value?.destroy();
    scrollInstance.value?.off('pullingUp', handlePullingUp);
  });

  // 搭配 keep-alive 使用
  onActivated(() => {
    scrollInstance.value?.enable();
    scrollInstance.value?.refresh();
  });

  // 搭配 keep-alive 使用
  onDeactivated(() => {
    scrollInstance.value?.disable();
  });

  return {
    scrollInstance,
    pullingUpLoading,
  };
};

export default useScroll;
