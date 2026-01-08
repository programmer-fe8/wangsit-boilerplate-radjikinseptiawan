<script setup lang="ts">
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';

import { useBreadcrumbStore } from '@/store';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Another Page',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <h1>Hello from Another Tab</h1>
</template>
