<script lang="ts" setup>
import { Button, ButtonFilter, ButtonSearch } from '@fewangsit/wangsvue';
import { computed } from 'vue';

const filtercontainer = computed(() => []);
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabltoolbars">
    <ButtonSearch />

    <ButtonFilter />

    <Button class="border-0" icon="history-line" severity="none" />

    <Button label="+ Register" severity="secondary" />
  </div>

  <FilterContainer :fields="filtercontainer" />
</template>
