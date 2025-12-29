<script setup lang="ts">
import { shallowRef } from 'vue';

import { Button } from '@fewangsit/wangsvue';

import DialogRegisterAdmin from '@/components/modules/AdminModule/DialogRegisterAdmin.vue';
import type { AdminRegistrationDto } from '@/dto/admin-registration.dto';

/**
 * Reactive variables
 */
const showRegisterDialog = shallowRef<boolean>(false);

/**
 * Methods
 */
const openRegisterDialog = (): void => {
  showRegisterDialog.value = true;
};

const handleAdminRegistered = (values: AdminRegistrationDto): void => {
  showRegisterDialog.value = false;
  /*
   * Handle successful registration (e.g., show toast, refresh data)
   * TODO: Implement API call to register admin
   */
  // eslint-disable-next-line no-console
  console.log('Admin registered:', values);
};
</script>

<template>
  <div class="p-6" data-wv-name="admin-registration-view">
    <div class="mb-6" data-wv-section="header">
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">
        Admin Management
      </h1>
      <p class="text-gray-600">Manage admin users and their permissions</p>
    </div>

    <div class="mb-6" data-wv-section="actions">
      <Button
        @click="openRegisterDialog"
        class="bg-blue-600 hover:bg-blue-700"
        icon="user-add"
        label="Register New Admin"
      />
    </div>

    <DialogRegisterAdmin
      v-model:visible="showRegisterDialog"
      @submit="handleAdminRegistered"
    />
  </div>
</template>
