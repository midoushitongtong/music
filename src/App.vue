<template>
  <!-- header -->
  <Header />

  <!-- router view -->
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </RouterView>

  <Player />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/header/Header.vue';
import Player from '@/components/player/Player.vue';

export default defineComponent({
  components: {
    Header,
    Player,
  },
});
</script>

<style lang="scss">
@import './App';
</style>
