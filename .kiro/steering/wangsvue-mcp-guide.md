---
inclusion: always
---

# Wangsvue Component Implementation Guide

## Mandatory Rules for AI Assistant

1. **ALWAYS use `{"format": "toon"}` for ALL Wangsvue MCP tool calls** - reduces token usage by 70%
2. **NEVER guess component APIs** - always resolve types through MCP tools
3. **Follow the 5-step workflow below** - skipping steps leads to incomplete implementations
4. **Use batch type resolution** when possible to minimize API calls

## Required Implementation Workflow

When implementing ANY Wangsvue component, follow this exact sequence:

1. **Search**: `mcp_wangsvue_mcp_search_components` with relevant query
2. **Analyze**: `mcp_wangsvue_mcp_analyze_component` for basic metadata
3. **Resolve Component Class and all related types**: `mcp_wangsvue_mcp_resolve_type_definition` with component name
4. **Implement**: Write Vue component using resolved API definitions
5. **Lint**** Run `npx eslint . --fix` multiple times until all eslint errors fixed

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
  "query": "button",
  "format": "toon",
  "limit": 5
})
// Returns: componentId: "button--fewangsit-wangsvue"

// Step 2: Get basic metadata
mcp_wangsvue_mcp_analyze_component({
  "componentId": "button--fewangsit-wangsvue",
  "format": "toon"
})
// Returns: name="Button", importPath="@fewangsit/wangsvue"

// Step 3: Batch resolve all API types
mcp_wangsvue_mcp_resolve_type_definition({
  "types": ["Button"],
  "includeRelated": true
})
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

| Problem | Solution |
|---------|----------|
| Component not found | Try broader search terms or different category |
| Type undefined error | Use `mcp_wangsvue_mcp_resolve_type_definition` |
| Import path incorrect | Check exact path from `mcp_wangsvue_mcp_analyze_component` |
| Missing prop definitions | Ensure you resolved the Props type from ClassComponent |
| Slot names unknown | Resolve the Slots type from ClassComponent |

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
import { ComponentName } from '@fewangsit/wangsvue'

// Define props based on resolved ComponentProps
interface Props {
  // Use exact prop names and types from MCP resolution
}

// Define emits based on resolved ComponentEmits
const emit = defineEmits<{
  // Use exact event signatures from MCP resolution
}>()
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
