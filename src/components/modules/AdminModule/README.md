# Admin Module

This module contains components related to admin user management.

## Components

### DialogRegisterAdmin.vue

A dialog form component for registering new admin users. It includes the following fields:

- **Name** (required): Admin's full name
- **Nickname** (required): Admin's nickname
- **Position** (required): Dropdown with predefined positions (Manager, Supervisor, Staff, Administrator, IT Support)
- **Phone Number** (required): Phone number input with validation
- **Address** (required): Textarea for complete address
- **Marriage Status** (required): Dropdown with options (Single, Married, Divorced, Widowed)
- **Bank Account Number** (required): Text input for bank account
- **Roles** (required): Multi-select with permissions (Read, Write, Update, Delete)

## Usage

```vue
<template>
  <DialogRegisterAdmin
    v-model:visible="showDialog"
    @submit="handleAdminRegistered"
  />
</template>

<script setup lang="ts">
import DialogRegisterAdmin from '@/components/modules/AdminModule/DialogRegisterAdmin.vue';
import type { AdminRegistrationDto } from '@/dto/admin-registration.dto';

const showDialog = ref(false);

const handleAdminRegistered = (admin: AdminRegistrationDto) => {
  console.log('New admin registered:', admin);
};
</script>
```

## Features

- Form validation using vee-validate
- Responsive grid layout
- Proper TypeScript typing
- Follows Wangsvue component patterns
- ESLint compliant code structure
