import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/ExampleLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'ExampleView',
        component: (): Promise<Component> => import('@/views/ExampleView.vue'),
      },
      {
        path: 'another',
        name: 'AnohterExampleView',
        component: (): Promise<Component> =>
          import('@/views/AnotherExampleView.vue'),
      },
      {
        path: 'Asset',
        name: 'Asset',
        component: (): Promise<Component> => import('@/views/Asset.vue'),
      },
      {
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
