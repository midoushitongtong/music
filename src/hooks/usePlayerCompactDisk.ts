import { ref } from 'vue';

const usePlayerCompactDisk = () => {
  const cdContentRef = ref<HTMLDivElement | null>(null);
  const cdImageRef = ref<HTMLImageElement | null>(null);

  // 同步 cdImage 的 transform 到 cdContent
  const syncTransform = () => {
    if (!cdContentRef.value || !cdImageRef.value) {
      return;
    }

    const cdContentTransform = getComputedStyle(cdContentRef.value).transform;
    const cdImageTransform = getComputedStyle(cdImageRef.value).transform;

    cdContentRef.value.style.transform =
      cdContentTransform === 'none'
        ? // 第一次的同步直接覆盖
          cdImageTransform
        : // 第一次之后的同步需要叠加
          cdContentTransform.concat(cdImageTransform);
  };

  return {
    cdContentRef,
    cdImageRef,
    syncTransform,
  };
};

export default usePlayerCompactDisk;
