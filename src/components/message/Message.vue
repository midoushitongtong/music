<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <div class="message-container" v-show="visible" @click="hide">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'Message',
  setup() {
    const visible = ref(false);
    const hideMessageInterval = ref<any>();

    const show = () => {
      visible.value = true;

      // 清空定时器
      clearInterval(hideMessageInterval.value);

      // 定时2秒后隐藏
      hideMessageInterval.value = setTimeout(() => {
        hide();
      }, 2000);
    };

    const hide = () => {
      // 清空定时器
      clearInterval(hideMessageInterval.value);

      visible.value = false;
    };

    onUnmounted(() => {
      // 清空定时器
      clearInterval(hideMessageInterval.value);
    });

    return {
      visible,
      show,
      hide,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './Message';
</style>
