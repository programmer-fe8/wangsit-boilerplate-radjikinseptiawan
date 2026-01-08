<script setup lang="ts">
import { Button } from '@fewangsit/wangsvue';
import { ButtonProps } from '@fewangsit/wangsvue/button';
import { ref } from 'vue';

// Interactive state
const isLoading = ref(false);
const loadingCustom = ref(false);
const clickCount = ref(0);

const currentSeverity = ref<ButtonProps['severity']>('secondary');

const severities: ButtonProps['severity'][] = [
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'help',
  'contrast',
];

let severityIndex = 0;

// Interactive functions
const toggleLoading = (): void => {
  isLoading.value = !isLoading.value;
  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
};

const toggleCustomLoading = (): void => {
  loadingCustom.value = !loadingCustom.value;
  if (loadingCustom.value) {
    setTimeout(() => {
      loadingCustom.value = false;
    }, 2000);
  }
};

const incrementCounter = (): void => {
  clickCount.value++;
};

const cycleSeverity = (): void => {
  severityIndex = (severityIndex + 1) % severities.length;
  currentSeverity.value = severities[severityIndex];
};
</script>

<template>
  <div class="button-demo p-6 space-y-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Button Component Demo
      </h1>
      <p class="text-gray-600">
        Comprehensive demonstration of the Wangsvue Button component with all
        its features and variations.
      </p>
    </div>

    <!-- Basic Buttons -->
    <section class="demo-section">
      <h2 class="section-title">Basic Buttons</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Default Button</h3>
          <Button label="Default Button" />
        </div>

        <div class="demo-item">
          <h3>With Icon</h3>
          <Button icon="save" label="Save" />
        </div>

        <div class="demo-item">
          <h3>Icon Only</h3>
          <Button icon="search" tooltip="Search" />
        </div>

        <div class="demo-item">
          <h3>Loading State</h3>
          <Button label="Loading..." loading />
        </div>
      </div>
    </section>

    <!-- Severity Variants -->
    <section class="demo-section">
      <h2 class="section-title">Severity Variants</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Primary (Default)</h3>
          <Button label="Primary" />
        </div>

        <div class="demo-item">
          <h3>Secondary</h3>
          <Button label="Secondary" severity="secondary" />
        </div>

        <div class="demo-item">
          <h3>Success</h3>
          <Button label="Success" severity="success" />
        </div>

        <div class="demo-item">
          <h3>Info</h3>
          <Button label="Info" severity="info" />
        </div>

        <div class="demo-item">
          <h3>Warning</h3>
          <Button label="Warning" severity="warning" />
        </div>

        <div class="demo-item">
          <h3>Danger</h3>
          <Button label="Danger" severity="danger" />
        </div>

        <div class="demo-item">
          <h3>Help</h3>
          <Button icon="information-line" label="Help" severity="help" />
        </div>

        <div class="demo-item">
          <h3>Contrast</h3>
          <Button label="Contrast" severity="contrast" />
        </div>
      </div>
    </section>

    <!-- Button Styles -->
    <section class="demo-section">
      <h2 class="section-title">Button Styles</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Raised</h3>
          <Button label="Raised" raised />
        </div>

        <div class="demo-item">
          <h3>Rounded</h3>
          <Button label="Rounded" rounded />
        </div>

        <div class="demo-item">
          <h3>Text</h3>
          <Button label="Text" text />
        </div>

        <div class="demo-item">
          <h3>Outlined</h3>
          <Button label="Outlined" outlined />
        </div>

        <div class="demo-item">
          <h3>Plain</h3>
          <Button label="Plain" plain />
        </div>

        <div class="demo-item">
          <h3>Link</h3>
          <Button label="Link Style" link />
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="demo-section">
      <h2 class="section-title">Button Sizes</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Small</h3>
          <Button label="Small Button" size="small" />
        </div>

        <div class="demo-item">
          <h3>Normal (Default)</h3>
          <Button label="Normal Button" />
        </div>

        <div class="demo-item">
          <h3>Large</h3>
          <Button label="Large Button" size="large" />
        </div>
      </div>
    </section>

    <!-- Icon Positions -->
    <section class="demo-section">
      <h2 class="section-title">Icon Positions</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Left (Default)</h3>
          <Button icon="download" icon-pos="left" label="Download" />
        </div>

        <div class="demo-item">
          <h3>Right</h3>
          <Button icon="arrow-right" icon-pos="right" label="Next" />
        </div>

        <div class="demo-item">
          <h3>Top</h3>
          <Button icon="upload-2" icon-pos="top" label="Upload" />
        </div>

        <div class="demo-item">
          <h3>Bottom</h3>
          <Button icon="settings" icon-pos="bottom" label="Settings" />
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="demo-section">
      <h2 class="section-title">Buttons with Badges</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Default Badge</h3>
          <Button badge="5" icon="mail" label="Messages" />
        </div>

        <div class="demo-item">
          <h3>Success Badge</h3>
          <Button badge="12" badge-severity="success" label="Completed" />
        </div>

        <div class="demo-item">
          <h3>Warning Badge</h3>
          <Button badge="3" badge-severity="warning" label="Pending" />
        </div>

        <div class="demo-item">
          <h3>Danger Badge</h3>
          <Button badge="!" badge-severity="danger" label="Errors" />
        </div>
      </div>
    </section>

    <!-- Tooltips -->
    <section class="demo-section">
      <h2 class="section-title">Buttons with Tooltips</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Bottom Tooltip (Default)</h3>
          <Button icon="info" tooltip="This is helpful information" />
        </div>

        <div class="demo-item">
          <h3>Top Tooltip</h3>
          <Button
            icon="information-line"
            tooltip="Get help here"
            tooltip-pos="top"
          />
        </div>

        <div class="demo-item">
          <h3>Left Tooltip</h3>
          <Button icon="settings" tooltip="Open settings" tooltip-pos="left" />
        </div>

        <div class="demo-item">
          <h3>Right Tooltip</h3>
          <Button icon="user" tooltip="User profile" tooltip-pos="right" />
        </div>
      </div>
    </section>

    <!-- Custom Slots -->
    <section class="demo-section">
      <h2 class="section-title">Custom Slots</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Custom Content</h3>
          <Button>
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full" />
              Online Status
            </span>
          </Button>
        </div>

        <div class="demo-item">
          <h3>Custom Icon Slot</h3>
          <Button label="Custom Icon">
            <template #icon="{ class: iconClass }">
              <span :class="iconClass">🚀</span>
            </template>
          </Button>
        </div>

        <div class="demo-item">
          <h3>Custom Loading Icon</h3>
          <Button
            :loading="loadingCustom"
            @click="toggleCustomLoading"
            label="Loading..."
          >
            <template #loadingicon="{ class: iconClass }">
              <span :class="iconClass">⏳</span>
            </template>
          </Button>
        </div>
      </div>
    </section>

    <!-- Interactive Examples -->
    <section class="demo-section">
      <h2 class="section-title">Interactive Examples</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Toggle Loading</h3>
          <Button
            :label="isLoading ? 'Loading...' : 'Start Process'"
            :loading="isLoading"
            @click="toggleLoading"
          />
        </div>

        <div class="demo-item">
          <h3>Counter Button</h3>
          <Button
            :badge="clickCount > 0 ? clickCount.toString() : undefined"
            :label="`Clicked ${clickCount} times`"
            @click="incrementCounter"
            badge-severity="info"
            icon="add"
          />
        </div>

        <div class="demo-item">
          <h3>Dynamic Severity</h3>
          <Button
            :label="currentSeverity"
            :severity="currentSeverity"
            @click="cycleSeverity"
          />
        </div>
      </div>
    </section>

    <!-- Combination Examples -->
    <section class="demo-section">
      <h2 class="section-title">Advanced Combinations</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Raised + Rounded + Success</h3>
          <Button
            icon="check"
            label="Complete"
            raised
            rounded
            severity="success"
          />
        </div>

        <div class="demo-item">
          <h3>Outlined + Large + Warning</h3>
          <Button
            icon="error"
            label="Warning Action"
            outlined
            severity="warning"
            size="large"
          />
        </div>

        <div class="demo-item">
          <h3>Text + Small + Danger</h3>
          <Button
            icon="delete-bin"
            label="Delete"
            severity="danger"
            size="small"
            text
          />
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section class="demo-section">
      <h2 class="section-title">Code Examples</h2>
      <div class="space-y-4">
        <div class="code-example">
          <h3>Basic Usage</h3>
          <pre class="code-block"><code>&lt;Button label="Click Me" /&gt;
&lt;Button icon="save" label="Save" /&gt;
&lt;Button icon="search" tooltip="Search" /&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>With Severity and Styles</h3>
          <pre class="code-block"><code>&lt;Button 
  label="Success Action" 
  severity="success"
  raised
  rounded
/&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>With Badge and Loading</h3>
          <pre class="code-block"><code>&lt;Button 
  badge="5"
  badge-severity="info"
  icon="mail"
  label="Messages" 
  :loading="isLoading"
  @click="handleClick"
/&gt;</code></pre>
        </div>

        <div class="code-example">
          <h3>Custom Slot Content</h3>
          <pre class="code-block"><code>&lt;Button&gt;
  &lt;span class="flex items-center gap-2"&gt;
    &lt;span class="w-2 h-2 bg-green-500 rounded-full" /&gt;
    Custom Content
  &lt;/span&gt;
&lt;/Button&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.button-demo {
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
  font-size: 1.5rem;
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

@media (min-width: 1280px) {
  .demo-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.demo-item h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
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
