import { createPinia } from 'pinia';

const store = createPinia();

store.use((ctx) => {
  ctx.store.$onAction((action) => {
    // 打印修改前的状态
    console.log(
      '🍍 %c[prev state]',
      'font-weight: bold; color: #69B7FF;',
      JSON.parse(JSON.stringify(action.store.$state))
    );

    // 打印 action
    console.log('🍍 %c[action]', 'font-weight: bold; color: #69B7FF;', {
      type: action.name,
      args: action.args,
    });

    action.after(() => {
      // 打印修改后的状态
      console.log(
        '🍍 %c[next state]',
        'font-weight: bold; color: #69B7FF;',
        JSON.parse(JSON.stringify(action.store.$state))
      );
    });
  });
});

export default store;
