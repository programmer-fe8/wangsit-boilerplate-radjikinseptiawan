<script setup lang="ts">
import { DialogConfirm, eventBus } from '@fewangsit/wangsvue';

import { Member } from '@/types/member.type';

defineProps<{ list: Member[] }>();

const visible = defineModel<boolean>('visible', { default: false });
</script>

<template>
  <DialogConfirm
    v-model:visible="visible"
    :list
    @confirm="eventBus.emit('data-table:update', {})"
    actionable
    confirm-label="Yakin"
    header="Delete User"
    header-icon="delete-bin-7"
    list-label="name"
    severity="danger"
  />
</template>
