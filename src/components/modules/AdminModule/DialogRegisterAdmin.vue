<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  InputPhoneNumber,
  InputText,
  MultiSelect,
  Textarea,
} from '@fewangsit/wangsvue';
import { shallowRef } from 'vue';

import type { AdminRegistrationDto } from '@/dto/admin-registration.dto';
import AdminService from '@/services/admin.service';

/**
 * Props and emits
 */
const emit = defineEmits<{
  submit: [values: AdminRegistrationDto];
}>();

const visible = defineModel<boolean>('visible', { default: false });

/**
 * Constants
 */
const POSITION_OPTIONS = [
  { label: 'Manager', value: 'manager' },
  { label: 'Supervisor', value: 'supervisor' },
  { label: 'Staff', value: 'staff' },
  { label: 'Administrator', value: 'administrator' },
  { label: 'IT Support', value: 'it_support' },
];

const MARRIAGE_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
];

const ROLE_OPTIONS = [
  { label: 'Read', value: 'read' },
  { label: 'Write', value: 'write' },
  { label: 'Update', value: 'update' },
  { label: 'Delete', value: 'delete' },
];

/**
 * Reactive variables
 */
const isSubmitting = shallowRef<boolean>(false);

/**
 * Methods
 */
const handleSubmit = async (payload: {
  formValues: AdminRegistrationDto;
}): Promise<void> => {
  try {
    isSubmitting.value = true;

    // Call the API to register the admin
    const response = await AdminService.registerAdmin(payload.formValues);

    // Emit the response data
    emit('submit', response.data);

    // Close dialog after successful submission
    visible.value = false;
  } catch (error) {
    console.error('Error registering admin:', error);
    // TODO: Show error toast or handle error appropriately
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['cancel', 'submit']"
    @submit="handleSubmit"
    data-wv-name="dialog-register-admin"
    header="Register New Admin"
    header-icon="user-add"
    submit-btn-label="Register Admin"
    width="large"
  >
    <template #fields="{ formValues }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Name -->
        <InputText
          v-model="formValues.name"
          :max-length="100"
          class="col-span-1"
          field-name="name"
          label="Full Name"
          mandatory
          placeholder="Enter admin's full name"
          use-validator
        />

        <!-- Nickname -->
        <InputText
          v-model="formValues.nickname"
          :max-length="50"
          class="col-span-1"
          field-name="nickname"
          label="Nickname"
          mandatory
          placeholder="Enter admin's nickname"
          use-validator
        />

        <!-- Position -->
        <Dropdown
          v-model="formValues.position"
          :options="POSITION_OPTIONS"
          class="col-span-1"
          field-name="position"
          label="Position"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select position"
          use-validator
        />

        <!-- Phone Number -->
        <InputPhoneNumber
          v-model="formValues.phoneNumber"
          :max-digit="15"
          class="col-span-1"
          field-name="phoneNumber"
          label="Phone Number"
          mandatory
          placeholder="Enter phone number"
          use-validator
        />

        <!-- Marriage Status -->
        <Dropdown
          v-model="formValues.marriageStatus"
          :options="MARRIAGE_STATUS_OPTIONS"
          class="col-span-1"
          field-name="marriageStatus"
          label="Marriage Status"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select marriage status"
          use-validator
        />

        <!-- Bank Account Number -->
        <InputText
          v-model="formValues.bankAccountNumber"
          :max-length="20"
          class="col-span-1"
          field-name="bankAccountNumber"
          label="Bank Account Number"
          mandatory
          placeholder="Enter bank account number"
          type="text"
          use-validator
        />

        <!-- Address -->
        <Textarea
          v-model="formValues.address"
          :max-input="500"
          :rows="3"
          class="col-span-2"
          field-name="address"
          label="Address"
          mandatory
          placeholder="Enter complete address"
          use-validator
        />

        <!-- Roles -->
        <MultiSelect
          v-model="formValues.roles"
          :options="ROLE_OPTIONS"
          class="col-span-2"
          display="chip"
          field-name="roles"
          label="Roles"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select admin roles"
          use-validator
        />
      </div>
    </template>
  </DialogForm>
</template>
