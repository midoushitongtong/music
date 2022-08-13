<template>
  <div class="container">
    <!-- top -->
    <div class="header">
      <div class="back" @click="goBack">
        <i class="icon-back" />
      </div>
      <!-- content -->
      <div class="content">
        <span class="icon"></span>
        <h1 class="text">Chicken Music</h1>
      </div>
    </div>
    <!-- switch -->
    <Switch :items="['我喜欢的', '最近播放']" v-model:value="currentTabIndex"></Switch>
    <!-- favorite -->
    <UserFavorite v-if="currentTabIndex === 0" />
    <!-- play history -->
    <UserPlayHistory v-if="currentTabIndex === 1" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Switch from '@/components/switch/Switch.vue';
import { useMusicStore } from '@/store/music';
import UserFavorite from '../../views/user/UserFavorite.vue';
import UserPlayHistory from '../../views/user/UserPlayHistory.vue';

export default defineComponent({
  name: 'User',
  components: { UserFavorite, UserPlayHistory, Switch },
  setup() {
    const musicStore = useMusicStore();
    const favoriteList = computed(() => musicStore.favoriteList);
    const currentTabIndex = ref(0);
    const router = useRouter();

    // go back
    const goBack = () => {
      router.go(-1);
    };

    return {
      currentTabIndex,
      goBack,
      favoriteList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './User';
</style>
