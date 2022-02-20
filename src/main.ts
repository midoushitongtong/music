import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyloadNext from 'vue-lazyload-next';
import loading from '@/directive/loading';

const app = createApp(App);

app.use(store).use(router).use(VueLazyloadNext).use(loading);

app.mount('#app');
