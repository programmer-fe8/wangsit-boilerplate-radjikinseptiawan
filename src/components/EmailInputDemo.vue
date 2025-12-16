<script setup lang="ts">
import { ref } from 'vue';
import { InputEmail } from '@fewangsit/wangsvue';

// Reactive data
const basicEmail = ref<string>();
const customEmail = ref<string>();
const disabledEmail = ref<string>('admin@company.com');
const availabilityEmail = ref<string>();

// Event log for demonstration
const eventLog = ref<string[]>([]);

// Existing emails for validation
const existingEmails = ref<string[]>([
  'john@company.com',
  'jane@company.com',
  'admin@company.com',
]);

// Event handlers
const onEmailChange = (value: string | undefined): void => {
  addToEventLog(`Email changed: ${value}`);
};

const onEmailBlur = (): void => {
  addToEventLog('Email blur event');
};

const onEmailInput = (): void => {
  addToEventLog('Email input event');
};

// Availability check function
const checkEmailAvailability = async (email: string): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check against existing emails
  const isAvailable = !existingEmails.value.includes(email);
  addToEventLog(
    `Availability check for ${email}: ${isAvailable ? 'Available' : 'Not available'}`,
  );

  return isAvailable;
};

// Utility function to add events to log
const addToEventLog = (message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`[${timestamp}] ${message}`);

  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10);
  }
};
</script>

<template>
  <div class="email-input-demo p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Email Input Demo</h2>

    <!-- Basic Email Input -->
    <div class="mb-6">
      <InputEmail
        v-model="basicEmail"
        :validator-message="{
          empty: 'Email is required',
          invalidFormat: 'Please enter a valid email address',
        }"
        @blur="onEmailBlur"
        @input="onEmailInput"
        @update:model-value="onEmailChange"
        field-name="email"
        label="Email Address"
        mandatory
        placeholder="Enter your email"
        use-validator
      />
    </div>

    <!-- Email Input with Custom Validation -->
    <div class="mb-6">
      <InputEmail
        v-model="customEmail"
        :existing-values="existingEmails"
        :validator-message="{
          empty: 'Work email is required',
          invalidFormat: 'Please enter a valid email format',
          exist: 'This email is already registered',
        }"
        field-info="Must be a valid work email address"
        field-name="workEmail"
        label="Work Email"
        mandatory
        placeholder="Enter your work email"
        use-validator
      />
    </div>

    <!-- Disabled Email Input -->
    <div class="mb-6">
      <InputEmail
        v-model="disabledEmail"
        disabled
        field-info="This email cannot be changed"
        label="Registered Email"
      />
    </div>

    <!-- Email Input with Availability Check -->
    <div class="mb-6">
      <InputEmail
        v-model="availabilityEmail"
        :check-availability="checkEmailAvailability"
        :validator-message="{
          empty: 'Email is required',
          invalidFormat: 'Invalid email format',
          exist: 'Email is not available',
        }"
        field-name="newEmail"
        label="New Account Email"
        mandatory
        placeholder="Check email availability"
        use-validator
      />
    </div>

    <!-- Display Values -->
    <div class="mt-8 p-4 bg-gray-100 rounded-lg">
      <h3 class="text-lg font-semibold mb-3">Current Values:</h3>
      <div class="space-y-2 text-sm">
        <div><strong>Basic Email:</strong> {{ basicEmail || 'Not set' }}</div>
        <div><strong>Work Email:</strong> {{ customEmail || 'Not set' }}</div>
        <div><strong>Disabled Email:</strong> {{ disabledEmail }}</div>
        <div>
          <strong>Availability Email:</strong>
          {{ availabilityEmail || 'Not set' }}
        </div>
      </div>
    </div>

    <!-- Event Log -->
    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-3">Event Log:</h3>
      <div class="max-h-32 overflow-y-auto">
        <div
          :key="index"
          v-for="(event, index) in eventLog"
          class="text-xs text-gray-600 mb-1"
        >
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-input-demo {
  font-family: 'Inter', sans-serif;
}
</style>
