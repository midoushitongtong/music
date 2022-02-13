<template>
  <!-- tab -->
  <Tab />

  <div class="container">TopList</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tab from '@/components/tab/Tab.vue';

export default defineComponent({
  name: 'TopList',
  components: {
    Tab,
  },
});
</script>

<style lang="scss" scoped>
@import './TopList';
</style>
