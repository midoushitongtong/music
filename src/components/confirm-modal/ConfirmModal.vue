<template>
  <Teleport to="body">
    <Transition name="confirm">
      <div class="confirm-wrapper" v-show="visible">
        <!-- 遮罩层 -->
        <div class="backdrop" @click="hideModal" />
        <!-- 内容 -->
        <div class="confirm-container">
          <div class="confirm-content">
            <!-- description -->
            <div class="description">{{ modalData?.description }}</div>
            <!-- operate -->
            <div class="operate">
              <div class="operate-button" @click="handleConfirm">
                {{ modalData?.confirmButtonText }}
              </div>
              <div class="operate-button" @click="handleCancel">
                {{ modalData?.cancelButtonText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

type ModalData = {
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default defineComponent({
  name: 'ConfirmModal',
  setup() {
    const visible = ref(false);

    const modalData = ref<ModalData | null>(null);

    // 初始化 modal
    const initModal = (modalData_: ModalData) => {
      modalData.value = modalData_;
      visible.value = true;
    };

    // 隐藏 modal
    const hideModal = () => {
      visible.value = false;
    };

    // confirm 按钮
    const handleConfirm = () => {
      hideModal();
      if (modalData.value?.onConfirm) {
        modalData.value.onConfirm();
      }
    };

    // cancel 按钮
    const handleCancel = () => {
      hideModal();
      if (modalData.value?.onCancel) {
        modalData.value.onCancel();
      }
    };

    return {
      visible,
      modalData,
      initModal,
      handleConfirm,
      handleCancel,
      hideModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './ConfirmModal';
</style>
