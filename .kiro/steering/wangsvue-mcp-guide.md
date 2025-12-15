---
inclusion: always
---

# Wangsvue MCP Server Guide

## Critical Rules

**ALWAYS use `{"format": "toon"}` for all MCP tool calls** - this minimizes token usage and provides structured output.

**Required Workflow**: Before implementing any Wangsvue component:

1. Search for components using `mcp_wangsvue_mcp_search_components`
2. Analyze the selected component with `mcp_wangsvue_mcp_analyze_component` (gets basic info only)
3. **NEW**: Use `mcp_wangsvue_mcp_resolve_type_definition` with component name to get ClassComponent declaration
4. **NEW**: Extract Props/Slots/Emits type names from ClassComponent and resolve each with `mcp_wangsvue_mcp_resolve_type_definition`
5. Get source code if needed with `mcp_wangsvue_mcp_get_component_source`

## Essential MCP Tools

### Component Discovery

- **`mcp_wangsvue_mcp_search_components`**: Find components by query, category, or features
  - Always use `"format": "toon"` and `"limit": 5-10` for efficiency
  - Top result has highest relevance score
  - Categories: `form`, `navigation`, `layout`, `data-display`, `feedback`, `input`, `overlay`, `utility`

### Component Analysis

- **`mcp_wangsvue_mcp_analyze_component`**: Get basic component info (name, description, category, import info)
  - Use `componentId` from search results
  - Returns essential metadata but NOT detailed API definitions
  - **Next Step**: Use component name with `mcp_wangsvue_mcp_resolve_type_definition` to get API details

### Type Resolution

- **`mcp_wangsvue_mcp_resolve_type_definition`**: **PRIMARY TOOL** for getting component API details
  - **Step 1**: Use component name (e.g., "Button") to get ClassComponent declaration
  - **Step 2**: Extract type names from `ClassComponent<ButtonProps, ButtonSlots, unknown>`
  - **Step 3**: Resolve each type name (e.g., "ButtonProps", "ButtonSlots") to get detailed definitions
  - Also resolves custom types like `WangsIcons`, enum values, etc.

### Source Code Access

- **`mcp_wangsvue_mcp_get_component_source`**: Get Vue component implementation
- **`mcp_wangsvue_mcp_get_component_definition`**: Get TypeScript definitions

## NEW: Component API Discovery Workflow

After the refactoring, component API details (props, events, slots, methods) are resolved dynamically at runtime rather than pre-parsed. This provides always-current type information.

### Step-by-Step API Discovery

1. **Get Component Name**: From `analyze_component` result
2. **Resolve ClassComponent**: Use component name with `resolveType`
   ```javascript
   { "typeName": "Button" }
   // Returns: "declare class Button extends ClassComponent<ButtonProps, ButtonSlots, unknown> {}"
   ```
3. **Extract Type Parameters**: Parse the ClassComponent generics
   - First parameter = Props type (e.g., "ButtonProps")
   - Second parameter = Slots type (e.g., "ButtonSlots") 
   - Third parameter = Emits type (e.g., "unknown" or specific type)
4. **Resolve Each Type**: Get detailed definitions
   ```javascript
   { "typeName": "ButtonProps" }   // Detailed props with descriptions, types, defaults
   { "typeName": "ButtonSlots" }   // Slot definitions with parameters
   ```
5. **Find Exposed Methods**: Look inside the ClassComponent body for exposed methods
   ```javascript
   // After resolving component class, check the class body for exposed methods
   { "typeName": "DialogForm" }
   // Returns class with methods like: clearField(), setValues(), setFieldValue(), etc.
   ```

### Finding Component Exposed Methods

Some components expose methods that can be called via template refs. These are defined inside the ClassComponent body:

```typescript
declare class DialogForm extends ClassComponent<Props, Slots, Emits> {
  clearField: () => void;
  form: FormInstance;
  setValues: (values: GenericObject) => void;
  setFieldValue: <T extends string>(field: T, value: GenericObject[T]) => void;
  setErrors(fields: GenericObject): void;
}
```

**How to Find Exposed Methods:**
1. Use `resolveType` with the component name (e.g., "DialogForm")
2. Look inside the class body (between the `{` and `}`)
3. Methods and properties listed there are exposed and can be accessed via template refs

**Usage in Vue:**
```vue
<script setup>
const dialogRef = useTemplateRef('dialogRef');
const clearForm = () => dialogRef.value.clearField();
</script>

<template>
  <DialogForm ref="dialogRef" />
  <Button @click="clearForm">Clear</Button>
</template>
```

## Implementation Workflow

### Standard Component Implementation Process

1. **Search**: `mcp_wangsvue_mcp_search_components` with relevant query
2. **Analyze**: `mcp_wangsvue_mcp_analyze_component` using componentId from search (gets basic info)
3. **Resolve Component**: `mcp_wangsvue_mcp_resolve_type_definition` with component name to get ClassComponent declaration
4. **Extract Type Names**: Parse ClassComponent generic parameters (Props, Slots, Emits)
5. **Resolve API Types**: `mcp_wangsvue_mcp_resolve_type_definition` for each type name to get detailed definitions
6. **Implement**: Use the import path and resolved API details to write Vue component code

### Example Implementation Flow

```javascript
// 1. Search for button component
{ "query": "button", "format": "toon", "limit": 5 }

// 2. Analyze the selected component (basic info only)
{ "componentId": "button--fewangsit-wangsvue", "format": "toon" }
// Returns: name="Button", importPath="@fewangsit/wangsvue", etc.

// 3. Resolve component class to get ClassComponent declaration
{ "typeName": "Button" }
// Returns: "declare class Button extends ClassComponent<ButtonProps, ButtonSlots, unknown> {}"

// 4. Resolve each API type for detailed definitions
{ "typeName": "ButtonProps" }    // Get props details
{ "typeName": "ButtonSlots" }    // Get slots details
{ "typeName": "WangsIcons" }     // Resolve custom types as needed

// 5. Check for exposed methods (if any) in the class body
// The component class resolution from step 3 will show any exposed methods

// 6. Implement in Vue component with full API knowledge
import { Button } from '@fewangsit/wangsvue'
```

## Component Categories

- **`form`**: Button, Input, Checkbox, Radio, Select
- **`navigation`**: Menu, Breadcrumb, Tabs, Pagination
- **`layout`**: Grid, Container, Divider, Spacer
- **`data-display`**: Table, List, Card, Badge
- **`feedback`**: Message, Toast, Progress, Loading
- **`input`**: TextInput, DatePicker, FileUpload
- **`overlay`**: Modal, Tooltip, Popover, Drawer
- **`utility`**: Animation, Helper components

## Best Practices

### Search Strategy

- Start broad, then refine with category/status filters
- Use `"status": "stable"` for production code
- Check `treeshakable: true` for optimal bundle size
- Prefer components with `"source": "base"` for core functionality

### Error Handling

- Component not found → Try broader search terms or different category
- Custom type undefined → Use `mcp_wangsvue_mcp_resolve_type_definition`
- Import errors → Check the exact import path from component analysis

### Performance Tips

- Always use `"format": "toon"` to minimize token usage
- Limit search results to 5-10 items
- Cache component analysis results for repeated use

## Quick Reference

### Common Search Filters

- `"status": "stable"` - Production-ready components only
- `"treeshakable": true` - Optimized for bundle size
- `"accessible": true` - ARIA-compliant components
- `"responsive": true` - Mobile-friendly components

### Component Sources

- `"base"` - Core Wangsvue components (preferred)
- `"extended"` - Enhanced versions with extra features
- `"package"` - Package-specific implementations

### Typical Component Structure

```vue
<script setup lang="ts">
import { ComponentName } from '@fewangsit/wangsvue';
</script>

<template>
  <ComponentName :prop="value" @event="handler" class="custom-class">
    <template #slot-name>
      <!-- Slot content -->
    </template>
  </ComponentName>
</template>
```
