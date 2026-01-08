<script setup lang="ts">
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';

import ExampleModule from '@/components/modules/ExampleModule/ExampleModule.vue';
import { useBreadcrumbStore } from '@/store';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Home',
  },
];
</script>

<template>
  <ExampleModule />
</template>
