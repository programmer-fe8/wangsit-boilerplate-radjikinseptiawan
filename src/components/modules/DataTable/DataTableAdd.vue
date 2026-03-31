<script setup lang="ts">
import { DialogForm, InputText } from '@fewangsit/wangsvue';

/*
 * TODO: show shouldn't be a prop, it should be a v-model
 * Reference: https://vuejs.org/guide/components/v-model
 */
withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false,
  },
);
</script>

<template>
  <DialogForm
    v-model:visible="show"
    :buttons-template="['submit', 'clear']"
    header="Stay After Submit Dialogs"
    show-stay-checkbox
  >
    <h1>Register Asset</h1>

    <InputText
      :validator-message="{ empty: 'You must pick a grup' }"
      label="Group"
      mandatory
      use-validator
    />
  </DialogForm>
</template>
