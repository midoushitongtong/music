<template>
  <header class="header-container">
    <!-- content -->
    <div class="content">
      <span class="icon"></span>
      <h1 class="text">Chicken Music</h1>
    </div>
    <!-- user icon -->
    <RouterLink
      class="mine"
      :to="{
        name: 'User',
      }"
    >
      <i class="icon-mine"></i>
    </RouterLink>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
@import './Header';
</style>
