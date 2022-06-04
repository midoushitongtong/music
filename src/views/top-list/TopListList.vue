<template>
  <div
    class="container"
    v-lazy-container="{
      selector: 'img',
      error: require('@/assets/images/loading.gif'),
      loading: require('@/assets/images/loading.gif'),
    }"
  >
    <div class="list">
      <div
        class="list-item"
        v-for="item of topListDetail.topList"
        :key="item.id"
        @click="handleClickItem(item)"
      >
        <div class="left">
          <img class="top-list-image" :data-src="item.image" />
        </div>
        <div class="right">
          <div class="top-list-title">{{ item.title }}</div>
          <div class="song-list">
            <div class="song-list-item" v-for="(item2, index2) of item.songList" :key="index2">
              <span class="number">{{ index2 + 1 }}.</span>
              <span class="title">{{ item2.title }}</span>
              <span class="separator">-</span>
              <span class="singer">{{ item2.singer.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TopListDetail } from '@/apis/top-list/types';
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TopListList',
  components: {},
  props: {
    topListDetail: {
      type: Object as PropType<TopListDetail>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const handleClickItem = (item: TopListDetail['topList'][0]) => {
      router.push({
        name: 'TopListDetail',
        params: {
          id: item.id,
        },
      });
    };

    return {
      handleClickItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './TopListList';
</style>
