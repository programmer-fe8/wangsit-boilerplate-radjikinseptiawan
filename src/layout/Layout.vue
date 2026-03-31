<script lang="ts" setup>
import { Breadcrumb, Card } from '@fewangsit/wangsvue';
</script>

<template>
  <Breadcrumb />

  <Card>
    <template #content>
      <router-view />
    </template>
  </Card>
</template>
