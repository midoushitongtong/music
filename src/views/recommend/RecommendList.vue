<template>
  <div class="container">
    <!-- title -->
    <h1 class="content-title">热门歌单推荐</h1>

    <!-- list -->
    <div
      v-for="item in recommend.albums"
      :key="item.id"
      class="list-item"
      @click="handleClickItem(item)"
      v-lazy-container="{
        selector: 'img',
        error: require('@/assets/images/loading.gif'),
        loading: require('@/assets/images/loading.gif'),
      }"
    >
      <div class="image">
        <img :data-src="item.image" />
      </div>
      <div class="right">
        <h2 class="username">
          {{ item.username }}
        </h2>
        <p class="title">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Recommend } from '@/apis/recommend/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RecommendList',
  components: {},
  props: {
    recommend: {
      type: Object as PropType<Recommend>,
      required: true,
    },
  },
  setup() {
    const handleClickItem = (item: Recommend['albums'][0]) => {
      console.log(item);
    };

    return {
      handleClickItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './RecommendList';
</style>
