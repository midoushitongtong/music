import { App, createApp, DirectiveBinding } from 'vue';
import NoResult from '@/components/no-result/NoResult.vue';
import { addClass, removeClass } from '@/utils/document';

const noResultDirective = {
  install: (app: App<Element>) => {
    app.directive('noResult', {
      mounted(el, binding) {
        const app = createApp(NoResult);

        const componentInstance = app.mount(document.createElement('div')) as any;

        getElData(el).componentInstance = componentInstance;

        updateState(el, binding);
      },
      updated(el, binding) {
        updateState(el, binding);
      },
    });
  },
};

// 获取 el 的数据
const getElData = (el: any) => {
  if (!el[NoResult.name]) {
    el[NoResult.name] = {};
  }
  return el[NoResult.name];
};

// 更新 state
const updateState = (el: any, binding: DirectiveBinding<any>) => {
  // 更新 title
  getElData(el).componentInstance.setTitle(binding.value?.title);

  // 更新 dom
  if (binding.value?.noResult !== binding.oldValue?.noResult) {
    if (binding.value?.noResult) {
      append(el);
    } else {
      remove(el);
    }
  }
};

// 插入组件
const append = (el: any) => {
  const style = getComputedStyle(el);
  if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
    addClass(el, 'global-relative');
  }
  if (!el.contains(getElData(el).componentInstance.$el)) {
    el.appendChild(getElData(el).componentInstance.$el);
  }
};

// 删除组件
const remove = (el: any) => {
  if (el.contains(getElData(el).componentInstance.$el)) {
    el.removeChild(getElData(el).componentInstance.$el);
  }
  removeClass(el, 'global-relative');
};

export default noResultDirective;
