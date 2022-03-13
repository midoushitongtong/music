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
      <div v-for="item in singerGroupByTitleList" :key="item.title" class="singer-group-list-item">
        <!-- group title -->
        <h2 class="group-title">{{ item.title }}</h2>
        <!-- singer list -->
        <div class="singer-list">
          <li
            v-for="item2 in item.singerList"
            :key="item2.id"
            class="singer-list-item"
            @click="handleClickItem(item2)"
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
import { SingerGroupByTitleListItem } from '@/apis/singer/types';
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SingerList',
  components: {},
  props: {
    singerGroupByTitleList: {
      type: Array as PropType<SingerGroupByTitleListItem[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const handleClickItem = (item: SingerGroupByTitleListItem['singerList'][0]) => {
      router.push({
        name: 'SingerDetail',
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
@import './SingerList';
</style>
