import { App, createApp, DirectiveBinding } from 'vue';
import Loading from '@/components/loading/Loading.vue';
import { addClass, removeClass } from '@/utils/document';

const loadingDirective = {
  install: (app: App<Element>) => {
    app.directive('loading', {
      mounted(el, binding) {
        const app = createApp(Loading);

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
  if (!el[Loading.name]) {
    el[Loading.name] = {};
  }
  return el[Loading.name];
};

// 更新 state
const updateState = (el: any, binding: DirectiveBinding<any>) => {
  // 更新 title
  getElData(el).componentInstance.setTitle(binding.value?.title);

  // 更新 dom
  if (binding.value?.loading !== binding.oldValue?.loading) {
    if (binding.value?.loading) {
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

export default loadingDirective;
