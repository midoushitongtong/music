<template>
  <div class="tab-container">
    <!-- tab list item -->
    <RouterLink
      :class="['tab-list-item', item.active && 'active']"
      v-for="item in tabList"
      :key="item.name"
      :to="item.routeMeta"
    >
      <span class="tab-name">
        {{ item.name }}
      </span>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Tab',
  setup() {
    const route = useRoute();

    const tabList = computed(() => [
      {
        name: '推荐',
        routeMeta: {
          name: 'Recommend',
        },
        active: route.name === 'Recommend',
      },
      {
        name: '歌手',
        routeMeta: {
          name: 'Singer',
        },
        active: route.name === 'Singer',
      },
      {
        name: '排行',
        routeMeta: {
          name: 'TopList',
        },
        active: route.name === 'TopList',
      },
      {
        name: '搜索',
        routeMeta: {
          name: 'Search',
        },
        active: route.name === 'Search',
      },
    ]);

    return {
      tabList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Tab';
</style>
