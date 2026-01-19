---
inclusion: always
---

# Wangsvue Component Implementation Guide

## Mandatory Rules for AI Assistant

1. **ALWAYS use `{"format": "toon"}` for ALL Wangsvue MCP tool calls** - reduces token usage by 70%
2. **NEVER guess component APIs** - always resolve types through MCP tools
3. **Follow the 5-step workflow below** - skipping steps leads to incomplete implementations
4. **Use batch type resolution** when possible to minimize API calls
5. **ALWAYS search documentation first** - use `mcp_gitbook_mcp_searchDocumentation` for style guide compliance
6. **Follow Vue code structure guidelines** - maintain consistent organization and naming conventions

## Required Implementation Workflow

When implementing ANY Wangsvue component, follow this exact sequence:

0. **Documentation Search**: `mcp_gitbook_mcp_searchDocumentation` for relevant style guidelines
1. **Search**: `mcp_wangsvue_mcp_search_components` with relevant query
2. **Analyze**: `mcp_wangsvue_mcp_analyze_component` for basic metadata
3. **Resolve Component Class and all related types**: `mcp_wangsvue_mcp_resolve_type_definition` with component name
4. **Implement**: Write Vue component using resolved API definitions and documentation guidelines
5. **Lint**: Run `npx eslint . --fix` multiple times until all eslint errors fixed

## MCP Tool Reference

### 1. Component Discovery

**`mcp_wangsvue_mcp_search_components`**

- Purpose: Find components by name, category, or functionality
- Required params: `{"query": "search-term", "format": "toon", "limit": 5}`
- Categories: `form`, `navigation`, `layout`, `data-display`, `feedback`, `input`, `overlay`, `utility`
- Returns: componentId (needed for next step)

### 2. Component Metadata

**`mcp_wangsvue_mcp_analyze_component`**

- Purpose: Get import path, description, and basic info
- Required params: `{"componentId": "from-search", "format": "toon"}`
- Returns: component name, import path, category
- **Critical**: Does NOT return API details (props/slots/events)

### 3. Type Resolution (Most Important)

**`mcp_wangsvue_mcp_resolve_type_definition`**

- Purpose: Get complete TypeScript definitions for components and their APIs
- Usage patterns:
  - Component class: `{"types": ["ComponentName"]}`
  - API details: `{"types": ["ComponentProps", "ComponentSlots"]}`
  - Batch resolve: `{"types": ["ButtonProps", "ButtonSlots", "ButtonEmits"]}`
- **Pro tip**: Use `"includeRelated": true` to auto-resolve dependent types

### 4. Source Code (Optional)

**`mcp_wangsvue_mcp_get_component_source`** - Vue implementation
**`mcp_wangsvue_mcp_get_component_definition`** - TypeScript definitions

## Step-by-Step Implementation Example

### Complete Button Component Implementation

```javascript
// Step 1: Search for component
mcp_wangsvue_mcp_search_components({
  query: 'button',
  format: 'toon',
  limit: 5,
});
// Returns: componentId: "button--fewangsit-wangsvue"

// Step 2: Get basic metadata
mcp_wangsvue_mcp_analyze_component({
  componentId: 'button--fewangsit-wangsvue',
  format: 'toon',
});
// Returns: name="Button", importPath="@fewangsit/wangsvue"

// Step 3: Batch resolve all API types
mcp_wangsvue_mcp_resolve_type_definition({
  types: ['Button'],
  includeRelated: true,
});
// Returns: Button class definition and all related types

// Step 4: Implement with full type safety
```

## Component Categories & Search Strategy

### Available Categories

- **`form`**: Button, Input, Checkbox, Radio, Select
- **`navigation`**: Menu, Breadcrumb, Tabs, Pagination
- **`layout`**: Grid, Container, Divider, Spacer
- **`data-display`**: Table, List, Card, Badge
- **`feedback`**: Message, Toast, Progress, Loading
- **`input`**: TextInput, DatePicker, FileUpload
- **`overlay`**: Modal, Tooltip, Popover, Drawer
- **`utility`**: Animation, Helper components

### Search Best Practices

1. **Start broad**: Use general terms like "button", "table", "form"
2. **Filter by stability**: Add `"status": "stable"` for production code
3. **Optimize bundle size**: Use `"treeshakable": true` filter

## Common Issues & Solutions

| Problem                  | Solution                                                   |
| ------------------------ | ---------------------------------------------------------- |
| Component not found      | Try broader search terms or different category             |
| Type undefined error     | Use `mcp_wangsvue_mcp_resolve_type_definition`             |
| Import path incorrect    | Check exact path from `mcp_wangsvue_mcp_analyze_component` |
| Missing prop definitions | Ensure you resolved the Props type from ClassComponent     |
| Slot names unknown       | Resolve the Slots type from ClassComponent                 |

## Performance Guidelines

- **Always use `"format": "toon"`** - reduces response size by 70%
- **Limit search results** to 5-10 items maximum
- **Batch type resolution** when resolving multiple types
- **Cache component metadata** to avoid repeated analysis calls

## Quick Reference

### Essential Search Filters

```javascript
{
  "status": "stable",        // Production-ready only
  "treeshakable": true,      // Bundle optimization
  "accessible": true,        // ARIA compliance
  "responsive": true,        // Mobile support
  "source": "base"           // Core components (preferred)
}
```

### Standard Vue Component Pattern

```vue
<script setup lang="ts">
import { ComponentName } from '@fewangsit/wangsvue';

// Define props based on resolved ComponentProps
interface Props {
  // Use exact prop names and types from MCP resolution
}

// Define emits based on resolved ComponentEmits
const emit = defineEmits<{
  // Use exact event signatures from MCP resolution
}>();
</script>

<template>
  <ComponentName
    v-bind="props"
    @event="emit('event', $event)"
    class="custom-styling"
  >
    <!-- Use exact slot names from resolved ComponentSlots -->
    <template #slot-name="slotProps">
      {{ slotProps }}
    </template>
  </ComponentName>
</template>
```

## Critical Reminders for AI Assistant

1. **Never implement without type resolution** - always get complete API definitions
2. **Use exact import paths** from component analysis, not guessed paths
3. **Validate prop names** against resolved types before implementation
4. **Check slot availability** through type resolution, don't assume slots exist
5. **Follow Vue 3 Composition API patterns** with `<script setup>` syntax

## Documentation Integration

### GitBook Documentation Search

**`mcp_gitbook_mcp_searchDocumentation`**

- Purpose: Search team documentation for style guidelines, best practices, and implementation patterns
- Usage: Always search before implementing to ensure compliance with team standards
- Examples:
  - `{"query": "shallowRef vs ref Vue composition API"}`
  - `{"query": "template structure order Vue components"}`
  - `{"query": "component naming conventions Vue"}`

## Vue Code Structure Guidelines (From Documentation)

### File Structure Order

**MANDATORY**: All Vue SFC files must follow this exact structure:

```vue
<script setup lang="ts">
/**
 * The Component Logic
 */
</script>

<template>
  <!-- the Component Template -->
</template>

<style scoped>
/* The Component Style */
</style>
```

### Script Section Organization

**CRITICAL**: Follow this exact order in `<script setup>`:

1. **Import Order**:

   - Named imports first, then default imports
   - Separate named and default imports with empty line
   - Line break after multi-line import statements

2. **Props, Emits, Models**:

   ```typescript
   const props = defineProps<{
     propsName: string;
   }>();

   const emit = defineEmits<{
     updateKey: [key: string];
   }>();

   const visible = defineModel<boolean>('visible', { required: true });
   ```

3. **Vue.js Lifecycle Hooks** (in order):

   - onBeforeMount, onMounted, onBeforeUpdate, onUpdated
   - onBeforeUnmount, onUnmounted, onRenderTracked, onRenderTriggered, onErrorCaptured

4. **Vue Router Hooks**:

   ```typescript
   onBeforeRouteLeave(() => console.log('Route will be leave'));
   ```

5. **Plugin Setup**:

   ```typescript
   const store = useStore();
   const router = useRoute();
   const toast = useToast();
   ```

6. **Types, Constants, Variables** (separated by empty lines):

   ```typescript
   // Interfaces and types
   type ColumnFields = 'assetName' | 'reportedBy' | 'staff';

   // Constants (UPPERCASE_SNAKE_CASE)
   const COLUMNS: TableColumn[] = [...];

   // Reactive variables
   const componentName = shallowRef<string>('Component Name');

   // Computed properties
   const formatedComponentName = computed<string>(() =>
     componentName.value.toLocaleUpperCase()
   );

   // Provide statements
   provide('provideKey', dataToProvide);

   // Methods
   const componentMethod = (): void => {
     componentName.value = 'Example Component Edited';
   };
   ```

7. **Watchers**:

   ```typescript
   watch(formatedComponentName, (newName: string) => {
     console.log(`New name: ${newName}`);
   });
   ```

8. **defineExpose** (at the bottom):
   ```typescript
   defineExpose({
     componentVariable,
     formatedComponentName,
     componentMethod,
   });
   ```

## Reactivity Guidelines (From Documentation)

### When to Use `ref` vs `shallowRef`

**Use `shallowRef` for:**

- **Primitive values**: numbers, strings, booleans, Date, RegExp
- **Large data structures** where you don't need nested reactivity
- **Performance optimization** when only `.value` changes matter

```typescript
// Primitives - ALWAYS use shallowRef for consistency
const isActive = shallowRef<boolean>(false);
const userName = shallowRef<string>('');
const count = shallowRef<number>(0);

// Large objects without nested reactivity
const userData = shallowRef<User>({
  name: 'John Doe',
  address: { city: 'New York', country: 'US' },
});

// Update entire object to trigger reactivity
const updateCity = (newCity: string): void => {
  userData.value = {
    ...userData.value,
    address: { ...userData.value.address, city: newCity },
  };
};
```

**Use `ref` for:**

- **Deeply reactive objects** where nested property changes need to trigger updates

```typescript
const userData = ref<User>({
  name: 'John Doe',
  address: { city: 'New York', country: 'US' },
});

// Direct nested property updates work
userData.value.address.city = 'Los Angeles'; // Triggers reactivity
```

### Variable Declaration Rules

1. **Always use `const`** for reactive variables
2. **Always specify generic types** even when auto-inferrable
3. **Use descriptive names** - avoid `data`, `temp`, `obj`
4. **Boolean prefixes**: `is`, `has`, `can` (e.g., `isLoggedIn`, `hasPermission`)
5. **Constants**: Use `UPPERCASE_SNAKE_CASE` for non-reactive values

## Naming Conventions (From Documentation)

### File Naming

- **Vue SFC files**: PascalCase (e.g., `UserProfile.vue`)
- **Test files**: PascalCase with `.cy.spec.ts` (e.g., `HomePage.cy.spec.ts`)
- **Utility files**: camelCase with `.util.ts` (e.g., `toast.util.ts`)

### Component Naming Pattern

**[Module][Feature][Component][Subcomponent].vue**

```
📁 Borrow/
  📁 BorrowHistory/
    📄 BorrowHistoryPage.vue        # Main page component
    📄 BorrowHistoryFilter.vue      # Search and filter controls
    📄 BorrowHistoryTable.vue       # Data table display
```

### Code Naming

- **Types/Interfaces/Classes**: PascalCase (`UserProfile`, `ApiResponse`)
- **Variables/Methods/Functions**: camelCase (`userProfile`, `getUserInfo()`)
- **Constants**: UPPERCASE_SNAKE_CASE (`MAX_USER_COUNT`, `API_URL`)
- **Routes**: PascalCase matching view component (`ExampleView`)

## API Service Guidelines (From Documentation)

### Service Structure

```typescript
// Use PascalCase for service object name
const UserService = {
  // Use camelCase for method names with descriptive HTTP action
  getUserDetail: (
    params: GetUserParams,
  ): Promise<AxiosResponse<UserResponse>> => {
    // Pass params to config, don't concatenate to URL
    return API.get('/users/detail', { params });
  },

  createUser: (body: CreateUserDto): Promise<AxiosResponse<UserResponse>> => {
    return API.post('/users', body);
  },
};
```

### Type Organization

- **Request DTOs**: Place in `dto/` folder
- **Response Types**: Place in `types/` folder
- **Interface naming**: Use nouns, not verbs (`UserProfile` not `GetUserProfile`)

## Router Guidelines (From Documentation)

### Route Configuration

```typescript
{
  path: '/example',
  name: 'ExampleView', // PascalCase, matches view component
  component: () => import('@/views/ExampleView.vue'), // Lazy loading with arrow function
}
```

### Rules

1. **Import only views** - not commons or modules components
2. **Use arrow functions** for lazy loading
3. **PascalCase route names** matching view component names

## Testing Guidelines (From Documentation)

### Component Accessibility

```vue
<template>
  <!-- Use data-wv-name for root element -->
  <div data-wv-name="user-profile">
    <!-- Use data-wv-section for sections -->
    <section data-wv-section="personal-info">
      <!-- Component content -->
    </section>
  </div>
</template>
```

## Git Commit Guidelines (From Documentation)

### Conventional Commits Format

```
type(scope): description

- Detailed explanation of changes
- Additional context if needed
```

**Types**: `fix`, `feat`, `docs`, `chore`, `refactor`, `ci`, `test`, `style`

**Example**:

```
fix(datatable): bulk action not properly works

- Bulk action should applying the selected action on Apply button clicked
- The label should be back into 'Bulk Action' on Apply button clicked
```

## Implementation Checklist

Before submitting any Vue component, verify:

- [ ] Used `mcp_gitbook_mcp_searchDocumentation` for style guidelines
- [ ] Followed exact script section organization order
- [ ] Used `shallowRef` for primitives, `ref` for deep reactivity
- [ ] Applied correct naming conventions (PascalCase files, camelCase variables)
- [ ] Added `data-wv-name` and `data-wv-section` attributes for testing
- [ ] Used proper import order and lazy loading for routes
- [ ] Followed API service structure with proper typing
- [ ] Ran `npx eslint . --fix` until all errors resolved

## Documentation Search Examples

Common searches to perform before implementation:

```typescript
// Before creating reactive variables
mcp_gitbook_mcp_searchDocumentation({
  query: 'shallowRef vs ref Vue composition API',
});

// Before structuring component
mcp_gitbook_mcp_searchDocumentation({
  query: 'Vue code structure script organization',
});

// Before naming components/files
mcp_gitbook_mcp_searchDocumentation({
  query: 'component naming conventions Vue',
});

// Before creating API services
mcp_gitbook_mcp_searchDocumentation({
  query: 'API service structure TypeScript',
});

// Before adding routes
mcp_gitbook_mcp_searchDocumentation({
  query: 'router configuration Vue lazy loading',
});
```
