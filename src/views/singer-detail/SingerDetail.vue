<template>
  <div
    class="container"
    v-loading="{
      loading: initDataLoading,
      title: '正在载入 ...',
    }"
  >
    <template v-if="!initDataLoading && singerDetail">
      <SingerDetailContent :singerDetail="singerDetail" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { getSingerDetail } from '@/apis/singer';
import { SingerDetail } from '@/apis/singer/types';
import { useRoute } from 'vue-router';
import SingerDetailContent from './SingerDetailContent.vue';

export default defineComponent({
  name: 'SingerDetail',
  components: {
    SingerDetailContent,
  },
  setup() {
    const initDataLoading = ref(true);
    const singerDetail = ref<SingerDetail | null>(null);
    const route = useRoute();
    const id = computed(() => route.params.id.toString());

    // 初始化数据
    const initData = async () => {
      try {
        initDataLoading.value = true;
        const result = await getSingerDetail({
          id: id.value,
        });
        singerDetail.value = result.result;
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
      singerDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SingerDetail';
</style>
