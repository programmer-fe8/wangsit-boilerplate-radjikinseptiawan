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
        path: 'another-page',
        name: 'AnotherExampleView',
        component: (): Promise<Component> => import('@/views/ExampleView2.vue'),
      },
      {
        path: 'button-demo',
        name: 'ButtonDemo',
        component: (): Promise<Component> => import('@/views/ButtonDemo.vue'),
      },
      {
        path: 'badge-demo',
        name: 'BadgeDemo',
        component: (): Promise<Component> => import('@/views/BadgeDemo.vue'),
      },
      {
        path: 'dialog-registration-demo',
        name: 'DialogRegistrationDemo',
        component: (): Promise<Component> =>
          import('@/views/DialogRegistrationDemo.vue'),
      },
      {
        path: 'dialog-confirm-demo',
        name: 'DialogConfirmDemo',
        component: (): Promise<Component> =>
          import('@/views/DialogConfirmDemo.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
