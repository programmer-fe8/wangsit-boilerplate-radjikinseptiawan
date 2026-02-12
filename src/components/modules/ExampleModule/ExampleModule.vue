<script setup lang="ts">
import { Badge, BadgeGroup, DataTable } from '@fewangsit/wangsvue';
import {
  FetchListResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';

import UserServices from '@/services/example.service';
import { Member } from '@/types/member.type';

import DialogDeleteUser from './DialogDeleteUser.vue';
import ExampleModuleHeader from './ExampleModuleHeader.vue';

const router = useRouter();

const selectedUser = shallowRef<Member>();
const showDeleteUserDialog = shallowRef<boolean>(false);

const SINGLE_ACTION: MenuItem[] = [
  {
    label: 'Detail',
    icon: 'checkbox-blank-circle',
    command: (): void => {
      router.push('/detail');
    },
  },
  {
    label: 'Delete User',
    icon: 'checkbox-blank-circle',
    danger: true,
    command: (): void => {
      showDeleteUserDialog.value = true;
    },
  },
];

const TABLE_COLUMNS: TableColumn<Member>[] = [
  {
    field: 'nickName',
    header: 'Name',
    sortable: true,
    reorderable: false,
    fixed: true,
    bodyComponent: (data: Member): TableCellComponent => ({
      component: Badge,
      props: {
        label: data.nickName,
      },
    }),
  },
  {
    field: 'email',
    header: 'Email',
    sortable: true,
    fixed: true,
  },
  {
    field: 'teams',
    header: 'Teams',
    sortable: false,
    bodyComponent: (data: Member): TableCellComponent => ({
      component: BadgeGroup,
      props: {
        labels: data.teams,
        limit: 2,
        headerLabel: 'Teams',
      },
    }),
  },
];

const getTableData = async (
  params: QueryParams,
): Promise<FetchListResponse<Member> | undefined> => {
  try {
    const { data } = await UserServices.getUsers(params);

    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <ExampleModuleHeader />

  <DataTable
    :columns="TABLE_COLUMNS"
    :fetch-function="getTableData"
    :options="SINGLE_ACTION"
    @toggle-option="selectedUser = $event"
    data-key="_id"
    lazy
    table-name="user-list"
    use-option
    use-paginator
  />

  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="selectedUser ? [selectedUser] : []"
    list-label="name"
  />
</template>
