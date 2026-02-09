<script setup lang="ts">
import {
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  FilterContainer,
} from '@fewangsit/wangsvue';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { MenuItem } from '@fewangsit/wangsvue/menuitem';
import { AxiosResponse } from 'axios';
import { computed, shallowRef } from 'vue';

import { GetOptionsParams } from '@/dto/user.dto';
import UserServices from '@/services/example.service';
import { Member } from '@/types/member.type';

import DialogDeleteUser from './DialogDeleteUser.vue';

const dataSelected = shallowRef<Member[]>([]);
const showDeleteUserDialog = shallowRef<boolean>(false);

const bulkAction: MenuItem[] = [
  {
    label: 'Delete User',
    icon: 'checkbox-blank-circle',
    danger: true,
    command: (): void => {
      showDeleteUserDialog.value = true;
    },
  },
];

const filterFields = computed<FilterField[]>(() => [
  {
    label: 'Country',
    field: 'country',
    optionField: 'countryOptions',
    type: 'multiselect',
    placeholder: 'Select country',
    fetchOptionFn: getUserOptions,
  },
  {
    label: 'Age',
    fields: ['minAge', 'maxAge'],
    type: 'rangenumber',
    placeholder: '0',
  },
]);

const getUserOptions = async (
  params: GetOptionsParams,
): Promise<AxiosResponse<FetchOptionResponse<GetOptionsParams>>> => {
  return await UserServices.getOptions(params);
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonBulkAction
      v-model:selected-data="dataSelected"
      :options="bulkAction"
      table-name="user-list"
    />

    <ButtonSearch class="ml-auto" table-name="user-list" />

    <ButtonDownload file-name="Download" table-name="user-list" />

    <ButtonFilter table-name="user-list" />
  </div>

  <FilterContainer :fields="filterFields" table-name="user-list" />

  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="dataSelected"
    list-label="name"
  />
</template>
