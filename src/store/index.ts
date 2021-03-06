import { createPinia } from 'pinia';

const store = createPinia();

store.use((ctx) => {
  ctx.store.$onAction((action) => {
    const prevState = JSON.parse(JSON.stringify(action.store.$state));

    action.after(() => {
      // ćĺ°ć é˘
      console.groupCollapsed(`đ action ${action.store.$id} - ${action.name}`);
      // ćĺ°äżŽćšĺççść
      console.log(
        '%c[prev state]',
        'font-weight: bold; color: grey;',
        JSON.parse(JSON.stringify(prevState))
      );
      // ćĺ° action
      console.log('%c[action]', 'font-weight: bold; color: #69B7FF;', {
        type: action.name,
        args: action.args,
      });
      // ćĺ°äżŽćšĺççść
      console.log(
        '%c[next state]',
        'font-weight: bold; color: #4caf50;',
        JSON.parse(JSON.stringify(action.store.$state))
      );
      console.groupEnd();
    });
  });
});

export default store;
