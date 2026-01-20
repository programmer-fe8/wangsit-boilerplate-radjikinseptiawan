# Products API Specification

## Overview

This document describes the Products API endpoints for managing and querying product data.

## Base URL

```
https://wangsvue.netlify.app/api/products
```

## Data Models

### Product

```typescript
interface Product extends Data {
  id: string; // Unique product identifier
  code: string; // Product code/SKU
  name: string; // Product name
  description: string; // Product description
  image: string; // Product image URL
  price: number; // Product price
  category: string; // Product category
  quantity: number; // Available quantity
  inventoryStatus: string; // Inventory status (INSTOCK, OUTOFSTOCK, LOWSTOCK)
  isOutOfStock?: boolean; // Computed: true if quantity === 0
  rating: number; // Product rating (0-5)
  updatedAt: string; // Last update timestamp
  tags: Array<{
    // Product tags
    text: string;
    severity:
      | 'success'
      | 'info'
      | 'danger'
      | 'warning'
      | 'secondary'
      | 'contrast';
  }>;
}
```

### Option

```typescript
interface Option {
  label: string; // Display label
  value: string; // Option value
}
```

## Endpoints

### GET /api/products

Retrieve a paginated and filtered list of products.

#### Query Parameters

| Parameter         | Type   | Description                                               | Default   |
| ----------------- | ------ | --------------------------------------------------------- | --------- |
| `page`            | string | Page number (1-based)                                     | "1"       |
| `limit`           | string | Number of items per page                                  | Infinity  |
| `sortOrder`       | string | Sort order: 1 (asc) or -1 (desc)                          | "1"       |
| `sortBy`          | string | Field to sort by                                          | undefined |
| `search`          | string | Search terms (space-separated)                            | undefined |
| `category`        | string | Categories filter (JSON array or comma-separated)         | undefined |
| `quantity`        | string | Quantity range [min, max] or single value                 | undefined |
| `name`            | string | Product names filter (JSON array or comma-separated)      | undefined |
| `rating`          | string | Rating range [min, max] (0-5 scale)                       | undefined |
| `inventoryStatus` | string | Inventory statuses filter (JSON array or comma-separated) | undefined |

#### Response Format

```typescript
interface FetchResponse<Product> {
  message: string;
  data: {
    data: Product[]; // Paginated products array
    totalRecords: number; // Total filtered records
  };
}
```

#### Example Request

```
GET /api/products?page=1&limit=10&sortBy=price&sortOrder=1&category=Electronics&rating=4,5
```

#### Example Response

```json
{
  "message": "Success",
  "data": {
    "data": [
      {
        "id": "1",
        "code": "ELEC001",
        "name": "Laptop Pro",
        "description": "High-performance laptop",
        "image": "/images/laptop.jpg",
        "price": 1299.99,
        "category": "Electronics",
        "quantity": 15,
        "inventoryStatus": "INSTOCK",
        "isOutOfStock": false,
        "rating": 4.5,
        "updatedAt": "2024-01-15T10:30:00Z",
        "tags": [
          { "text": "Popular", "severity": "success" },
          { "text": "New", "severity": "info" }
        ]
      }
    ],
    "totalRecords": 1
  }
}
```

### GET /api/options

Retrieve filter options for products endpoint.

#### Query Parameters

| Parameter         | Type   | Description                                       | Required |
| ----------------- | ------ | ------------------------------------------------- | -------- |
| `category`        | string | Set to "true" to include category options         | false    |
| `name`            | string | Set to "true" to include product name options     | false    |
| `inventoryStatus` | string | Set to "true" to include inventory status options | false    |

#### Response Format

```typescript
interface FetchOptionResponse {
  message: string;
  data: FilterOptions; // Object with option arrays
}

interface FilterOptions {
  [key: string]: Option[];
}
```

#### Example Request

```
GET /api/options?category=true&inventoryStatus=true
```

#### Example Response

```json
{
  "message": "Success",
  "data": {
    "category": [
      { "label": "Electronics", "value": "Electronics" },
      { "label": "Accessories", "value": "Accessories" }
    ],
    "inventoryStatus": [
      { "label": "In Stock", "value": "INSTOCK" },
      { "label": "Out of Stock", "value": "OUTOFSTOCK" },
      { "label": "Low Stock", "value": "LOWSTOCK" }
    ]
  }
}
```

## Filtering Behavior

### Array Parameters

Parameters that accept arrays support two formats:

1. **JSON Array**: `["Electronics","Accessories"]`
2. **Comma-separated**: `Electronics,Accessories`

### Range Parameters

Quantity and rating support range specification:

- **Range**: `[10,50]` (min, max)
- **Single value**: `25`

### Search

The search parameter accepts space-separated terms and performs case-insensitive matching across all product fields.

## Error Handling

### Standard Error Response

```typescript
{
  statusCode: 500,
  statusMessage: "Internal Server Error"
}
```

## Performance Notes

- **Products endpoint**: Simulates 2-second delay for network latency
- **Options endpoint**: Simulates 500ms delay
- **Pagination**: Applied after filtering
- **Sorting**: Applied after filtering, before pagination

## Inventory Status Values

| Value        | Display Label | Description                      |
| ------------ | ------------- | -------------------------------- |
| `INSTOCK`    | In Stock      | Product is available             |
| `OUTOFSTOCK` | Out of Stock  | Product is not available         |
| `LOWSTOCK`   | Low Stock     | Product has limited availability |

## Tag Severity Levels

| Severity    | Usage                                     |
| ----------- | ----------------------------------------- |
| `success`   | Positive indicators (Popular, Featured)   |
| `info`      | Informational tags (New, Updated)         |
| `danger`    | Warning indicators (Discontinued, Recall) |
| `warning`   | Caution indicators (Limited Stock)        |
| `secondary` | Neutral tags                              |
| `contrast`  | High contrast tags for accessibility      |
