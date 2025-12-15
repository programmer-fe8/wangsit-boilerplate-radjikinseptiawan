<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';

const { breadcrumbs } = useBreadcrumbStore();

const tabMenus: MenuItem[] = [
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another-page',
  },
  {
    label: 'Button Demo',
    route: 'button-demo',
  },
  {
    label: 'Badge Demo',
    route: 'badge-demo',
  },
  {
    label: 'Dialog Registration Demo',
    route: 'dialog-registration-demo',
  },
];
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <TabMenu :menu="tabMenus" />
      <router-view />
    </template>
  </Card>
</template>
