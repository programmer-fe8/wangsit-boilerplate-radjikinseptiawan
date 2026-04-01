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
import { useRouter } from 'vue-router';

import AssetServices from '@/services/assets.service';
import { Assets } from '@/types/assets.type';

import AssetTableHeader from './AssetTableHeader.vue';

/*
 * TODO: Rename this to `router`. `router` is the name for the `useRouter` instance,
 * while `route` is the name for the `useRoute` instance, which you might use
 * in the future.
 */
const route = useRouter();

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
const selectedAset = shallowRef<Assets>(); // TODO: There should be blank lines between groups of variables, so you should add a blank line above this shallowRef to separate it from the constant

const singleActions = computed<MenuItem[]>(() => [
  {
    label: 'Detail Asset',
    icon: 'file-copy-2-line',
    command: (): void => {
      route.push('/detail');
    },
  },
  {
    label: 'Edit',
    icon: 'edit-2-line',
    command: (): void => {},
  },
]);

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
</script>

<template>
  <AssetTableHeader />

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
