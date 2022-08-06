<template>
  <!-- switch -->
  <div
    class="switch-list"
    :style="{
      width: `${items.length * switchElementWidth}px`,
    }"
  >
    <!-- switch list item -->
    <div
      class="switch-list-item"
      v-for="(item, index) in items"
      :key="item"
      :class="{ active: value === index }"
      @click="handleClick(index)"
    >
      <span>{{ item }}</span>
    </div>
    <!-- active bar -->
    <div class="active-bar" :style="activeBarStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AddSongSwitch',
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  emits: {
    'update:value': null,
  },
  setup(props, context) {
    // switch 宽度
    const switchElementWidth = 120;

    // active bar style
    const activeBarStyle = computed(() => {
      const x = switchElementWidth * props.value;
      return {
        transform: `translate3d(${x}px, 0, 0)`,
      };
    });

    // handle click
    const handleClick = (index: number) => {
      context.emit('update:value', index);
    };

    return {
      switchElementWidth,
      activeBarStyle,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './AddSongSwitch';
</style>
