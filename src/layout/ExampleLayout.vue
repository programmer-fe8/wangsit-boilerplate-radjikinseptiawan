<script setup lang="ts">
import { Breadcrumb, Card, Icon, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';

const TAB_MENUS: MenuItem[] = [
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another',
  },
  {
    label: 'asset',
    route: 'asset',
  },
];
</script>

<template>
  <div class="flex bg-gray-100 justify-between">
    <span>
      <img alt="" src="" />

      <h1>LogoIpsum</h1>
    </span>

    <span class="flex gap-2 items-center">
      <div>
        <p>John Doe</p>

        <p>7 Febuari 2024</p>
      </div>

      <button class="bg-gray-50 p-2 rounded-full">
        <Icon icon="user" />
      </button>

      <button class="bg-gray-50 p-2 rounded-full">
        <Icon icon="notification" />
      </button>
    </span>
  </div>

  <Breadcrumb />

  <Card>
    <template #content>
      <TabMenu :menu="TAB_MENUS" />

      <router-view />
    </template>
  </Card>
</template>
