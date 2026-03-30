<script lang="ts" setup>
import { Badge, DataTable } from '@fewangsit/wangsvue';
import {
  FetchListResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { computed, shallowRef } from 'vue';

import AssetServices from '@/services/assets.service';
import { Assets } from '@/types/assets.type';

import DataTableHeader from './DataTableHeader.vue';

const selectedAset = shallowRef<Assets | null>(null);
const singleActions = computed<MenuItem[]>(() => {
  const singleDataDelete = shallowRef<boolean>(false);
  return [
    {
      label: 'Detail Asset',
      icon: 'file-copy-2-line',
      command: (): void => {
        window.location.href = '/detail';
      },
    },
    {
      label: 'Edit',
      icon: 'edit-2-line',
      command: (): void => {
        singleDataDelete.value = true;
      },
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchListResponse<Assets> | undefined> => {
  try {
    const { data } = await AssetServices.getAssets(params);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const TABLE_COLUMNS: TableColumn<Assets>[] = [
  {
    field: 'assets',
    header: 'Asset',
  },
  {
    field: 'group',
    header: 'Group',
    bodyComponent: (data: Assets): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.group,
      },
    }),
  },
  {
    field: 'category',
    header: 'Category',
    bodyComponent: (data: Assets): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.category,
      },
    }),
  },
  {
    field: 'brand',
    header: 'Brand',
    bodyComponent: (data: Assets): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.brand,
        severity: 'dark',
      },
    }),
  },
  {
    field: 'type',
    header: 'Types',
    bodyComponent: (data: Assets): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.type,
        severity: 'dark',
      },
    }),
  },
  {
    field: 'alias',
    header: 'Alias',
  },
];
</script>

<template>
  <DataTableHeader />

  <DataTable
    :columns="TABLE_COLUMNS"
    :fetch-function="getTableData"
    :options="singleActions"
    @toggle-option="selectedAset = $event"
    data-key="_id"
    lazy
    table-name="asset-list"
    use-option
    use-paginator
  />
</template>
