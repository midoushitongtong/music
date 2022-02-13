<template>
  <!-- tab -->
  <Tab />

  <div class="container">Singer</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tab from '@/components/tab/Tab.vue';

export default defineComponent({
  name: 'Singer',
  components: {
    Tab,
  },
});
</script>

<style lang="scss" scoped>
@import './Singer';
</style>
