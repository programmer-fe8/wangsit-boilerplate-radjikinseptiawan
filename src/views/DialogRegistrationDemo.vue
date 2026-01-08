<script setup lang="ts">
import {
  Button,
  DialogForm,
  InputEmail,
  InputPassword,
  InputPhoneNumber,
  InputText,
} from '@fewangsit/wangsvue';
import { ref } from 'vue';

interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

// Reactive state
const showDialog = ref<boolean>(false);
const submittedData = ref<RegistrationData | null>(null);
const dialogFormRef = ref<InstanceType<typeof DialogForm>>();

// Event handlers
const handleSubmit = (values: FormValues): void => {
  // Validate password confirmation
  if (values.password !== values.confirmPassword) {
    // Set error on confirm password field
    if (dialogFormRef.value) {
      dialogFormRef.value.setErrors({
        confirmPassword: 'Passwords do not match',
      });
    }
    return;
  }

  // Store submitted data (excluding passwords for display)
  submittedData.value = {
    fullName: values.fullName,
    email: values.email,
    phoneNumber: values.phoneNumber,
  };

  // Dialog will close automatically due to close-on-submit="true"
};

const handleClear = (): void => {
  submittedData.value = null;
};

const handleClose = (): void => {
  showDialog.value = false;
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dialog Registration Form Demo</h1>

    <div class="space-y-4">
      <p class="text-gray-600">
        This demo shows a registration form inside a dialog using DialogForm
        component from Wangsvue.
      </p>

      <Button
        @click="showDialog = true"
        class="mb-4"
        label="Open Registration Dialog"
        severity="primary"
      />

      <DialogForm
        ref="dialogFormRef"
        v-model:visible="showDialog"
        :buttons-template="['clear', 'cancel', 'submit']"
        @clear="handleClear"
        @close="handleClose"
        @submit="handleSubmit"
        cancel-btn-label="Cancel"
        clear-btn-label="Clear Form"
        close-on-submit
        header="User Registration"
        submit-btn-label="Register"
        width="medium"
      >
        <template #fields>
          <div class="space-y-4">
            <InputText
              :max-length="50"
              :validator-message="{ empty: 'Full name is required' }"
              field-name="fullName"
              label="Full Name"
              mandatory
              placeholder="Enter your full name"
              use-validator
            />

            <InputEmail
              :validator-message="{
                empty: 'Email is required',
                invalidFormat: 'Please enter a valid email address',
              }"
              field-name="email"
              label="Email Address"
              mandatory
              placeholder="Enter your email address"
              use-validator
            />

            <InputPassword
              :validator-message="{ empty: 'Password is required' }"
              field-name="password"
              label="Password"
              mandatory
              placeholder="Enter your password"
              use-validator
            />

            <InputPassword
              :validator-message="{ empty: 'Please confirm your password' }"
              field-name="confirmPassword"
              label="Confirm Password"
              mandatory
              placeholder="Confirm your password"
              use-validator
            />

            <InputPhoneNumber
              :validator-message="{ empty: 'Phone number is required' }"
              field-name="phoneNumber"
              label="Phone Number"
              placeholder="Enter your phone number"
              use-validator
            />
          </div>
        </template>
      </DialogForm>

      <!-- Display submitted data -->
      <div
        v-if="submittedData"
        class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <h3 class="text-lg font-semibold text-green-800 mb-2">
          Registration Successful!
        </h3>
        <div class="text-sm text-green-700">
          <p><strong>Name:</strong> {{ submittedData.fullName }}</p>
          <p><strong>Email:</strong> {{ submittedData.email }}</p>
          <p><strong>Phone:</strong> {{ submittedData.phoneNumber }}</p>
          <p class="text-xs mt-2 text-green-600">
            Password fields are hidden for security
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
