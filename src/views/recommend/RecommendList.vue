<template>
  <div
    class="container"
    v-lazy-container="{
      selector: 'img',
      error: require('@/assets/images/loading.gif'),
      loading: require('@/assets/images/loading.gif'),
    }"
  >
    <!-- title -->
    <h1 class="content-title">热门歌单推荐</h1>

    <!-- list -->
    <div class="list">
      <div
        v-for="item in recommendDetail.albums"
        :key="item.id"
        class="list-item"
        @click="handleClickItem(item)"
      >
        <!-- image -->
        <div class="image">
          <img :data-src="item.image" />
        </div>
        <div class="right">
          <!-- username -->
          <h2 class="username">
            {{ item.username }}
          </h2>
          <!-- title -->
          <p class="title">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RecommendDetail } from '@/apis/recommend/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RecommendList',
  components: {},
  props: {
    recommendDetail: {
      type: Object as PropType<RecommendDetail>,
      required: true,
    },
  },
  setup() {
    const handleClickItem = (item: RecommendDetail['albums'][0]) => {
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
