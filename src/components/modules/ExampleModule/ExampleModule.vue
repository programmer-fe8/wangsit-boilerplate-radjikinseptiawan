<script setup lang="ts">
import { Button } from '@fewangsit/wangsvue';
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>

    <Button @click="count++" label="Increment" />
  </div>
</template>
