import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        // TODO: There shouldn't be any routes with duplicate names or components
        name: 'Asset',
        component: (): Promise<Component> => import('@/views/Asset.vue'),
      },
      {
        path: 'another',
        name: 'AnohterExampleView',
        component: (): Promise<Component> =>
          import('@/views/AnotherExampleView.vue'),
      },
      {
        /*
         * TODO: The path should be `assets`
         * I've updated the figma design so that you can see the path
         * on the top-left of the frame
         */
        path: 'home',
        name: 'Asset',
        component: (): Promise<Component> => import('@/views/Asset.vue'),
      },
      {
        // TODO: The path should be `assets/detail/:id`
        path: 'detail',
        name: 'Detail',
        component: (): Promise<Component> => import('@/views/AssetsDetail.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
