import { computed, Ref } from 'vue';

type Props = {
  groupListSelector: string;
  data: Ref;
  scrollInstanceRef: Ref;
};

const useShortcut = (props: Props) => {
  const ANCHOR_HEIGHT = 25;

  const shortcutList = computed(() => {
    return props.data.value.map((group: any) => {
      return group.title;
    });
  });

  // 缓存 touch 事件中的数据
  const touch = {
    y1: 0,
    y2: 0,
    anchorIndex: 0,
  };

  // touch start
  const onShortcutTouchStart = (e: any) => {
    touch.y1 = e.touches[0].pageY;

    const anchorIndex = parseInt(e.target?.dataset?.index);

    touch.anchorIndex = anchorIndex;

    scrollTo(anchorIndex);
  };

  // touch move
  const onShortcutTouchMove = (e: any) => {
    touch.y2 = e.touches[0].pageY;

    // 写长一点, 清晰
    let distance = (touch.y2 - touch.y1) / ANCHOR_HEIGHT;
    if (distance > 0) {
      distance = Math.floor(distance);
    } else {
      distance = Math.ceil(distance);
    }

    const anchorIndex = touch.anchorIndex + distance;

    scrollTo(anchorIndex);
  };

  // 滚动到 index
  const scrollTo = (index: number) => {
    if (isNaN(index)) {
      return;
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
    const targetElement = document.querySelector(props.groupListSelector)?.children[index];
    props.scrollInstanceRef.value.scrollToElement(targetElement, 150);
  };

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
  };
};

export default useShortcut;
