<template>
  <Teleport to="body">
    <Transition name="add-song">
      <div class="add-song-container" v-show="visible">
        <!-- header -->
        <div class="header">
          <div class="title">添加歌曲列表</div>
          <div class="close" @click="handleClose">
            <span class="icon-close"></span>
          </div>
        </div>

        <!-- search input -->
        <AddSongSearchInput v-model:query="query" placeholder="搜索歌曲" />

        <div v-show="!query">
          <!-- switch -->
          <Switch :items="['最近播放', '搜索历史']" v-model:value="currentTabIndex"></Switch>

          <!-- play history -->
          <AddSongPlayHistory v-if="currentTabIndex === 0" />
          <!-- search history -->
          <AddSongSearchHistory v-if="currentTabIndex === 1" @onSelectSearchHistory="updateQuery" />
        </div>

        <!-- search result -->
        <AddSongSearchSuggest v-show="query" :query="query" />
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Switch from '@/components/switch/Switch.vue';
import AddSongSearchInput from './AddSongSearchInput.vue';
import AddSongSearchSuggest from './AddSongSearchSuggest.vue';
import AddSongPlayHistory from './AddSongPlayHistory.vue';
import AddSongSearchHistory from './AddSongSearchHistory.vue';
import { emitter } from '@/utils/emitter';

export default defineComponent({
  name: 'AddSong',
  components: {
    Switch,
    AddSongSearchInput,
    AddSongSearchSuggest,
    AddSongPlayHistory,
    AddSongSearchHistory,
  },
  setup() {
    const visible = ref(false);
    const query = ref<string | undefined>(undefined);
    const currentTabIndex = ref(0);

    // show
    const show = () => {
      visible.value = true;

      // 通知子组件刷新 BScroll (visible 变成 true 需要刷新 BScroll, 因为此组件一开始就渲染了只会切换 visible 状态)
      emitter.emit('addSongRefreshScrollContainer');
    };

    // hide
    const hide = () => {
      visible.value = false;
    };

    // handleClose
    const handleClose = () => {
      hide();
    };

    // update query
    const updateQuery = (newQuery: string) => {
      query.value = newQuery;
    };

    return {
      visible,
      query,
      show,
      hide,
      handleClose,
      currentTabIndex,
      updateQuery,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './AddSong';
</style>
