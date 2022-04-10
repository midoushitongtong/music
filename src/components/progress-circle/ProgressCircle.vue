<template>
  <div
    class="progress-circle"
    :style="{
      width: `${radius}px`,
      height: `${radius}px`,
    }"
  >
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>

    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProgressCircle',
  props: {
    radius: {
      type: Number,
      default: 100,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const dashArray = Math.PI * 100;

    const dashOffset = computed(() => {
      return (1 - props.progress) * dashArray;
    });

    return {
      dashArray,
      dashOffset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './ProgressCircle.scss';
</style>
