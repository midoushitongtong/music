import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyloadNext from 'vue-lazyload-next';
import loading from '@/directive/loading';
import noResult from '@/directive/noResult';
import store from '@/store';

const app = createApp(App);

app.use(router).use(VueLazyloadNext).use(loading).use(noResult).use(store);

app.mount('#app');
