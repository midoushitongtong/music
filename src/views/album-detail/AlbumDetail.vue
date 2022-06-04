<template>
  <div
    class="container"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
  >
    <template v-if="!initDataLoading && albumDetail">
      <AlbumDetailContent :albumDetail="albumDetail" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AlbumDetailContent from './AlbumDetailContent.vue';
import { getAlbumDetail } from '@/apis/album';
import { AlbumDetail } from '@/apis/album/types';

export default defineComponent({
  name: 'AlbumDetail',
  components: {
    AlbumDetailContent,
  },
  setup() {
    const initDataLoading = ref(true);
    const albumDetail = ref<AlbumDetail | null>(null);
    const route = useRoute();
    const id = computed(() => route.params.id.toString());

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getAlbumDetail({
          id: id.value,
        });
        albumDetail.value = result.result;
        initDataLoading.value = false;
      } catch (error) {
        console.log('获取 api 数据失败');
        console.log(error);
      }
    };

    onMounted(async () => {
      await initData();
    });

    return {
      initDataLoading,
      albumDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './AlbumDetail';
</style>
