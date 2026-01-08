<script setup lang="ts">
import { Badge, InputBadge } from '@fewangsit/wangsvue';
import { ref } from 'vue';

// Badge demo state
const editableBadgeLabel = ref('Editable Badge');
const removableBadges = ref(['Badge 1', 'Badge 2', 'Badge 3']);

// InputBadge demo state
const basicInputBadges = ref(['Vue', 'TypeScript', 'Wangsvue']);
const emailInputBadges = ref(['user@example.com', 'admin@test.com']);
const validatedInputBadges = ref(['Valid Item']);
const editableInputBadges = ref(['Editable', 'Read Only', 'Another Editable']);
const removableInputBadges = ref(['Removable', 'Protected', 'Also Removable']);

// Interactive functions
const handleBadgeRemove = (index: number): void => {
  removableBadges.value.splice(index, 1);
};

const handleBadgeUpdate = (newLabel: string): void => {
  editableBadgeLabel.value = newLabel;
};

const handleInputBadgeUpdate = (newValue: string[]): void => {
  basicInputBadges.value = newValue;
};

const handleEmailBadgeUpdate = (newValue: string[]): void => {
  emailInputBadges.value = newValue;
};

const handleValidatedBadgeUpdate = (newValue: string[]): void => {
  validatedInputBadges.value = newValue;
};

const handleEditableBadgeUpdate = (newValue: string[]): void => {
  editableInputBadges.value = newValue;
};

const handleRemovableBadgeUpdate = (newValue: string[]): void => {
  removableInputBadges.value = newValue;
};
</script>

<template>
  <div class="badge-demo p-6 space-y-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Badge & InputBadge Components Demo
      </h1>
      <p class="text-gray-600">
        Comprehensive demonstration of Badge and InputBadge components with all
        their features and variations.
      </p>
    </div>

    <!-- Badge Component Demos -->
    <div class="space-y-8">
      <h2
        class="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2"
      >
        Badge Component
      </h2>

      <!-- Basic Badges -->
      <section class="demo-section">
        <h3 class="section-title">Basic Badges</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Default Badge</h4>
            <Badge label="Default" />
          </div>

          <div class="demo-item">
            <h4>With Tooltip</h4>
            <Badge label="Hover me" tooltip="Custom tooltip text" />
          </div>

          <div class="demo-item">
            <h4>Disabled Badge</h4>
            <Badge disabled label="Disabled" />
          </div>
        </div>
      </section>

      <!-- Badge Severities -->
      <section class="demo-section">
        <h3 class="section-title">Badge Severities</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Primary</h4>
            <Badge label="Primary" severity="primary" />
          </div>

          <div class="demo-item">
            <h4>Success</h4>
            <Badge label="Success" severity="success" />
          </div>

          <div class="demo-item">
            <h4>Info</h4>
            <Badge label="Info" severity="info" />
          </div>

          <div class="demo-item">
            <h4>Warning</h4>
            <Badge label="Warning" severity="warning" />
          </div>

          <div class="demo-item">
            <h4>Danger</h4>
            <Badge label="Danger" severity="danger" />
          </div>

          <div class="demo-item">
            <h4>Dark</h4>
            <Badge label="Dark" severity="dark" />
          </div>
        </div>
      </section>

      <!-- Badge Formats -->
      <section class="demo-section">
        <h3 class="section-title">Badge Formats</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Username Format</h4>
            <Badge format="username" label="very.long.username@example.com" />
          </div>

          <div class="demo-item">
            <h4>No Wrap Format</h4>
            <Badge
              format="nowrap"
              label="This is a very long text that should not wrap"
            />
          </div>

          <div class="demo-item">
            <h4>Default (Wrapping)</h4>
            <Badge
              label="This is a long text that will wrap normally in the badge"
            />
          </div>
        </div>
      </section>

      <!-- Interactive Badges -->
      <section class="demo-section">
        <h3 class="section-title">Interactive Badges</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Editable Badge</h4>
            <Badge
              :label="editableBadgeLabel"
              @update:label="handleBadgeUpdate"
              editable
              restore-on-empty
            />
            <p class="text-sm text-gray-500 mt-2">
              Click to edit, press Enter to save
            </p>
          </div>

          <div class="demo-item">
            <h4>Removable Badges</h4>
            <div class="flex flex-wrap gap-2">
              <Badge
                :key="index"
                v-for="(badge, index) in removableBadges"
                :label="badge"
                @remove="handleBadgeRemove(index)"
                removable
                severity="info"
              />
            </div>
            <p class="text-sm text-gray-500 mt-2">Click × to remove badges</p>
          </div>

          <div class="demo-item">
            <h4>Disabled Remove Button</h4>
            <Badge
              disable-remove-button
              label="Protected Badge"
              severity="warning"
            />
            <p class="text-sm text-gray-500 mt-2">Remove button is disabled</p>
          </div>
        </div>
      </section>
    </div>

    <!-- InputBadge Component Demos -->
    <div class="space-y-8">
      <h2
        class="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2"
      >
        InputBadge Component
      </h2>

      <!-- Basic InputBadge -->
      <section class="demo-section">
        <h3 class="section-title">Basic InputBadge</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Text Input</h4>
            <InputBadge
              v-model="basicInputBadges"
              @update:model-value="handleInputBadgeUpdate"
              label="Technologies"
              placeholder="Add technology..."
            />
          </div>

          <div class="demo-item">
            <h4>Email Input</h4>
            <InputBadge
              v-model="emailInputBadges"
              @update:model-value="handleEmailBadgeUpdate"
              field-name="emails"
              label="Email Addresses"
              placeholder="Add email..."
              type="email"
            />
          </div>

          <div class="demo-item">
            <h4>With Field Info</h4>
            <InputBadge
              v-model="basicInputBadges"
              field-info="Press Enter to add new items"
              label="Items with Info"
              placeholder="Enter item..."
            />
          </div>
        </div>
      </section>

      <!-- InputBadge with Validation -->
      <section class="demo-section">
        <h3 class="section-title">InputBadge with Validation</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Mandatory Field</h4>
            <InputBadge
              v-model="validatedInputBadges"
              @update:model-value="handleValidatedBadgeUpdate"
              label="Required Items"
              mandatory
              placeholder="Add required item..."
              use-validator
            />
          </div>

          <div class="demo-item">
            <h4>With Existing Values Check</h4>
            <InputBadge
              v-model="validatedInputBadges"
              :existing-values="['Duplicate', 'Already Exists']"
              :validator-message="{ exist: 'This item already exists!' }"
              label="Unique Items"
              placeholder="Add unique item..."
              use-validator
            />
          </div>

          <div class="demo-item">
            <h4>Disabled State</h4>
            <InputBadge
              v-model="basicInputBadges"
              disabled
              label="Disabled Input"
              placeholder="Cannot type here..."
            />
          </div>
        </div>
      </section>

      <!-- Advanced InputBadge Features -->
      <section class="demo-section">
        <h3 class="section-title">Advanced Features</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Editable Values Control</h4>
            <InputBadge
              v-model="editableInputBadges"
              :editable-values="['Editable', 'Another Editable']"
              @update:model-value="handleEditableBadgeUpdate"
              label="Selective Editing"
              placeholder="Add item..."
            />
            <p class="text-sm text-gray-500 mt-2">
              Only some badges are editable
            </p>
          </div>

          <div class="demo-item">
            <h4>Removable Values Control</h4>
            <InputBadge
              v-model="removableInputBadges"
              :removable-values="['Removable', 'Also Removable']"
              @update:model-value="handleRemovableBadgeUpdate"
              label="Selective Removal"
              placeholder="Add item..."
            />
            <p class="text-sm text-gray-500 mt-2">
              Only some badges are removable
            </p>
          </div>

          <div class="demo-item">
            <h4>Disabled Remove Buttons</h4>
            <InputBadge
              v-model="removableInputBadges"
              :removable-values="['Removable']"
              label="Disabled Remove Buttons"
              placeholder="Add item..."
              remove-button-variant="disabled"
            />
            <p class="text-sm text-gray-500 mt-2">
              Remove buttons are disabled instead of hidden
            </p>
          </div>

          <div class="demo-item">
            <h4>Restore on Empty</h4>
            <InputBadge
              v-model="editableInputBadges"
              label="Restore on Empty"
              placeholder="Add item..."
              restore-value-on-empty
            />
            <p class="text-sm text-gray-500 mt-2">
              Badges restore previous value if left empty
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Code Examples -->
    <section class="demo-section">
      <h2 class="section-title">Code Examples</h2>
      <div class="space-y-6">
        <div class="code-example">
          <h3>Basic Badge Usage</h3>
          <pre class="code-block"><code>&lt;Badge label="Default Badge" /&gt;
&lt;Badge label="Success" severity="success" /&gt;
&lt;Badge label="Removable" removable @remove="handleRemove" /&gt;
&lt;Badge label="Editable" editable @update:label="handleUpdate" /&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>Basic InputBadge Usage</h3>
          <pre class="code-block"><code>&lt;InputBadge
  v-model="badges"
  label="Technologies"
  placeholder="Add technology..."
  @update:model-value="handleUpdate"
/&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>InputBadge with Validation</h3>
          <pre class="code-block"><code>&lt;InputBadge
  v-model="items"
  label="Required Items"
  mandatory
  use-validator
  :existing-values="existingItems"
  :validator-message="{ exist: 'Item already exists!' }"
/&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>Advanced InputBadge Features</h3>
          <pre class="code-block"><code>&lt;InputBadge
  v-model="badges"
  :editable-values="['Editable Item']"
  :removable-values="['Removable Item']"
  remove-button-variant="disabled"
  restore-value-on-empty
  type="email"
/&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.badge-demo {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .demo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .demo-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.demo-item h4 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.code-example {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.code-example h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.code-block {
  background-color: #111827;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  overflow-x: auto;
}

.code-block code {
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas,
    'Liberation Mono', Menlo, monospace;
}
</style>
