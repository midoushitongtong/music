type Props = {
  selector: string;
};

const usePlayerCompactDiskAnimation = (props: Props) => {
  const getElement = () => {
    return document.querySelector(props.selector) as HTMLDivElement;
  };

  let animate: Animation | null = null;

  // 动画 enter
  const enter = (el: any, done: any) => {
    const { x, y, scale } = getPositionAndScale();

    if (!animate) {
      // 只需要创建一次 animate
      animate = getElement().animate(
        [
          {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          },
          {
            transform: 'translate3d(0, 0, 0) scale(1)',
          },
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
        }
      );
    }

    // 播放率
    animate.playbackRate = 1;
    // 开始执行
    animate.play();

    const finish = () => {
      done();
      animate?.removeEventListener('finish', finish);
    };

    animate?.addEventListener('finish', finish);
  };

  // 动画 afterEnter
  const afterEnter = () => {
    console.log('afterEnter');
  };

  // 动画 leave
  const leave = (el: any, done: any) => {
    if (!animate) {
      return;
    }

    // 播放率
    animate.playbackRate = -1;
    // 开始执行
    animate.play();

    const finish = () => {
      done();
      animate?.removeEventListener('finish', finish);
    };

    animate?.addEventListener('finish', finish);
  };

  // 动画 afterLeave
  const afterLeave = () => {
    console.log('afterLeave');
  };

  const getPositionAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 45;
    const paddingTop = 110;
    const width = window.innerWidth - 60;

    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    const scale = targetWidth / width;

    return {
      x,
      y,
      scale,
    };
  };

  return {
    enter,
    afterEnter,
    leave,
    afterLeave,
  };
};

export default usePlayerCompactDiskAnimation;
