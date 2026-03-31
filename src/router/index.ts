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
        name: 'Home',
        component: (): Promise<Component> => import('@/views/AssetView.vue'),
      },
      {
        path: 'another',
        name: 'AnohterExampleView',
        component: (): Promise<Component> =>
          import('@/views/AnotherExampleView.vue'),
      },
      {
        path: 'assets',
        name: 'Asset',
        component: (): Promise<Component> => import('@/views/AssetView.vue'),
      },
      {
        path: 'detail',
        name: 'Detail',
        component: (): Promise<Component> =>
          import('@/views/AssetsDetailView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
