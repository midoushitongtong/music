import { computed, nextTick, Ref, ref, watch } from 'vue';

type Props = {
  groupListSelector: string;
  watchData: Ref<any>;
  scrollY: Ref<number>;
  titleHeight: number;
};

const useFixed = (props: Props) => {
  const groupListItemHeights = ref<number[]>([]);
  const currentIndex = ref(0);
  const distance = ref(0);

  // 偏移样式, 标题顶上去的效果
  const fixedStyle = computed(() => {
    const distanceTemp = distance.value;

    const diff =
      distanceTemp > 0 && distanceTemp < props.titleHeight ? distanceTemp - props.titleHeight : 0;

    return {
      transform: `translateY(${diff}px)`,
    };
  });

  // 计算子元素的高度
  // [100, 200, 500, 1000, ... 每个元素的高度 = "自身的高度" + "前面所有元素的高度"]
  const calculateGroupListItemHeights = () => {
    const groupListElement = document.querySelector(props.groupListSelector);

    if (!groupListElement) {
      return;
    }

    let height = 0;
    const newGroupListItemHeights = [height];

    const children = groupListElement.children;
    [...children].forEach((item) => {
      height += item.clientHeight;
      newGroupListItemHeights.push(height);
    });

    groupListItemHeights.value = newGroupListItemHeights;
  };

  // 计算当前的 index
  const calculateCurrentIndex = (newScrollY: number) => {
    const groupListItemHeightsTemp = groupListItemHeights.value;

    for (let i = 0; i < groupListItemHeightsTemp.length - 1; i++) {
      const heightTop = groupListItemHeightsTemp[i];
      const heightBottom = groupListItemHeightsTemp[i + 1];
      if (newScrollY >= heightTop && newScrollY <= heightBottom) {
        currentIndex.value = i;
        distance.value = heightBottom - newScrollY;
      }
    }
  };

  // 数据发生变化, 重新计算计算子元素的高度
  watch(
    () => props.watchData.value,
    async () => {
      // 等待渲染完成
      await nextTick();

      calculateGroupListItemHeights();

      calculateCurrentIndex(props.scrollY.value);
    },
    {
      immediate: true,
    }
  );

  // 滚动位置发生变化, 重新计算当前的 index
  watch(
    () => props.scrollY.value,
    (newScrollY) => {
      calculateCurrentIndex(newScrollY);
    },
    {
      immediate: true,
    }
  );

  return {
    currentIndex,
    fixedStyle,
  };
};

export default useFixed;
