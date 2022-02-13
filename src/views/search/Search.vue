<template>
  <!-- tab -->
  <Tab />

  <div class="container">Search</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tab from '@/components/tab/Tab.vue';

export default defineComponent({
  name: 'Search',
  components: {
    Tab,
  },
});
</script>

<style lang="scss" scoped>
@import './Search';
</style>
