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

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
@import './Header';
</style>
