<script lang="ts" setup>
import { Breadcrumb, Card, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';

const TAB_MENU: MenuItem[] = [
  {
    label: 'Assets',
    route: 'home',
  },
];
</script>

<template>
  <Breadcrumb />

  <Card>
    <template #content>
      <TabMenu :menu="TAB_MENU" />

      <router-view />
    </template>
  </Card>
</template>
