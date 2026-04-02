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
import { Asset } from '@/types/assets.type';

import AssetTableHeader from './AssetTableHeader.vue';
import DialogFormAsset from './DialogFormAsset.vue';

const router = useRouter();

const TABLE_COLUMNS: TableColumn<Asset>[] = [
  {
    field: 'assets',
    header: 'Asset',
  },
  {
    field: 'group',
    header: 'Group',
    bodyComponent: (data: Asset): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.group,
      },
    }),
  },
  {
    field: 'category',
    header: 'Category',
    bodyComponent: (data: Asset): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.category,
      },
    }),
  },
  {
    field: 'brand',
    header: 'Brand',
    bodyComponent: (data: Asset): TableCellComponent => ({
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
    bodyComponent: (data: Asset): TableCellComponent => ({
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

const selectedAset = shallowRef<Asset>();
const show = shallowRef<boolean>(false);

const singleActions = computed<MenuItem[]>(() => [
  {
    label: 'Detail Asset',
    icon: 'file-copy-2-line',
    command: (): void => {
      router.push(`/assets/detail/${selectedAset.value?._id}`);
    },
  },
  {
    label: 'Edit',
    icon: 'edit-2-line',
    command: (): void => {
      show.value = true;
    },
  },
]);

const getTableData = async (
  params: QueryParams,
): Promise<FetchListResponse<Asset> | undefined> => {
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

  <DialogFormAsset v-model:visible="show" :asset="selectedAset" />

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
