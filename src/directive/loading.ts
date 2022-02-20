import { App, createApp, DirectiveBinding } from 'vue';
import Loading from '@/components/loading/Loading.vue';
import { addClass, removeClass } from '@/utils/document';

const loadingDirective = {
  install: (app: App<Element>) => {
    app.directive('loading', {
      mounted(el, binding) {
        const app = createApp(Loading);
        const loadingInstance = app.mount(document.createElement('div')) as any;

        el.loadingInstance = loadingInstance;

        updateState(el, binding);
      },
      updated(el, binding) {
        updateState(el, binding);
      },
    });
  },
};

// 更新 state
const updateState = (el: any, binding: DirectiveBinding<any>) => {
  // 更新 title
  el.loadingInstance.setTitle(binding.value?.title);

  // 更新 dom
  if (binding.value?.loading !== binding.oldValue?.loading) {
    if (binding.value?.loading) {
      append(el);
    } else {
      remove(el);
    }
  }
};

// 插入 loading 组件
const append = (el: any) => {
  const style = getComputedStyle(el);
  if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
    addClass(el, 'global-relative');
  }
  el.appendChild(el.loadingInstance.$el);
};

// 删除 loading 组件
const remove = (el: any) => {
  el.removeChild(el.loadingInstance.$el);
  removeClass(el, 'global-relative');
};

export default loadingDirective;
