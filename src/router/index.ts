import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      return {
        name: 'Recommend',
      };
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/Recommend.vue'),
    children: [
      {
        path: '/recommend/album/:id',
        name: 'AlbumDetail',
        component: () =>
          import(/* webpackChunkName: "album-detail" */ '../views/album-detail/AlbumDetail.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/Search.vue'),
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer/Singer.vue'),
    children: [
      {
        path: '/singer/:id',
        name: 'SingerDetail',
        component: () =>
          import(/* webpackChunkName: "singer-detail" */ '../views/singer-detail/SingerDetail.vue'),
      },
    ],
  },
  {
    path: '/top-list',
    name: 'TopList',
    component: () => import(/* webpackChunkName: "top-list" */ '../views/top-list/TopList.vue'),
    children: [
      {
        path: '/top-list/:id',
        name: 'TopListDetail',
        component: () =>
          import(
            /* webpackChunkName: "top-list-detail" */ '../views/top-list-detail/TopListDetail.vue'
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
