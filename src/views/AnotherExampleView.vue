<script setup lang="ts">
import { useBreadcrumbStore } from '@fewangsit/wangsvue';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/breadcrumb';
import { onMounted } from 'vue';

import ExampleModule from '@/components/modules/ExampleModule/ExampleModule.vue';

onMounted(() => {
  setBreadcrumbs(MENUS);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const MENUS: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Another Page',
  },
];
</script>

<template>
  <ExampleModule />
</template>
