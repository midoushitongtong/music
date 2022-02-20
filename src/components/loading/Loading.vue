<template>
  <div class="loading-container">
    <div class="loading-content">
      <img width="25" height="25" src="@/assets/images/loading.gif" />
      <p v-if="title" class="title">{{ title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ref } from 'vue';
export default defineComponent({
  name: 'Loading',
  setup() {
    const title = ref<string | undefined>();

    const setTitle = (title_?: string) => {
      title.value = title_;
    };

    return {
      title,
      setTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Loading';
</style>
