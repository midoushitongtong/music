<template>
  <div
    class="container"
    v-lazy-container="{
      selector: 'img',
      error: require('@/assets/images/loading.gif'),
      loading: require('@/assets/images/loading.gif'),
    }"
  >
    <!-- singer group list -->
    <div class="singer-group-list">
      <div v-for="item in singer" :key="item.title" class="singer-group-list-item">
        <!-- group title -->
        <h2 class="group-title">{{ item.title }}</h2>
        <!-- singer list -->
        <div class="singer-list">
          <li
            v-for="item2 in item.singerList"
            :key="item2.id"
            class="singer-list-item"
            @click="handleClickItem(item)"
          >
            <!-- singer image -->
            <div class="singer-image">
              <img :data-src="item2.image" />
            </div>
            <!-- singer name -->
            <div class="singer-name">{{ item2.name }}</div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Singer } from '@/apis/singer/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SingerList',
  components: {},
  props: {
    singer: {
      type: Object as PropType<Singer>,
      required: true,
    },
  },
  setup() {
    const handleClickItem = (item: Singer[0]['singerList'][0]) => {
      console.log(item);
    };

    return {
      handleClickItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SingerList';
</style>
