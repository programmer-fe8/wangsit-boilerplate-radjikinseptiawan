<script setup lang="ts">
import { Breadcrumb, Card, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';

const tabMenus: MenuItem[] = [
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another',
  },
];
</script>

<template>
  <Breadcrumb />

  <Card>
    <template #content>
      <TabMenu :menu="tabMenus" />

      <router-view />
    </template>
  </Card>
</template>
