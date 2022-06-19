<template>
  <div class="search-input">
    <!-- search -->
    <i class="icon-search" />
    <!-- input -->
    <input type="text" class="input" v-model="innerQuery" :placeholder="placeholder" />
    <!-- clear -->
    <i class="icon-dismiss" v-show="!!innerQuery" @click="clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'SearchInput',
  props: {
    query: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  emits: {
    'update:query': null,
  },
  setup(props, context) {
    const innerQuery = ref(props.query);

    // 内部的 query 变化, 更新外部 query
    watch(
      innerQuery,
      debounce((newValue) => {
        context.emit('update:query', newValue);
      }, 300)
    );

    // 外部的 query 变化, 更新内部 query
    watch(
      () => props.query,
      (newValue) => {
        innerQuery.value = newValue;
      }
    );

    const clear = () => {
      innerQuery.value = '';
    };

    return {
      innerQuery,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './SearchInput';
</style>
