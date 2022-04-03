<template>
  <div class="lyric" v-if="currentSong"></div>
</template>

<script lang="ts">
import { computed } from 'vue-demi';

import { defineComponent, onMounted, ref, watch } from 'vue';
import { useMusicStore } from '@/store/music';

export default defineComponent({
  name: 'PlayerLyric',
  setup() {
    const musicStore = useMusicStore();
    const currentSong = computed(() => musicStore.currentSong);

    return {
      currentSong,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './PlayerLyric.scss';
</style>
