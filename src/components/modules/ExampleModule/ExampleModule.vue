<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { Badge, BadgeGroup, DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  TableCellComponent,
  QueryParams,
  TableColumn,
} from '@fewangsit/wangsvue/datatable';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { Member } from '@/types/member.type';
import DialogDeleteUser from './DialogDeleteUser.vue';
import ExampleModuleHeader from './ExampleModuleHeader.vue';
import UserServices from '@/services/example.service';

const router = useRouter();

const selectedUser = shallowRef<Member>();
const showDeleteUserDialog = shallowRef<boolean>(false);

const singleAction: MenuItem[] = [
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

const tableColumns = computed<TableColumn[]>(() => {
  return [
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
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<Member> | undefined> => {
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
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
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
