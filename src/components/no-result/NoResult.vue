<template>
  <div class="no-result-container">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NoResult',
  setup() {
    const title = ref<string | undefined>();

    const setTitle = (_title: string) => {
      title.value = _title;
    };

    return {
      title,
      setTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './NoResult';
</style>
