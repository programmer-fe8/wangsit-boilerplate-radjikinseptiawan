<script lang="ts" setup>
import {
  Button,
  ButtonFilter,
  ButtonSearch,
  FilterContainer,
} from '@fewangsit/wangsvue';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { AxiosResponse } from 'axios';
import { computed, shallowRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

import DialogFormAsset from './DialogFormAsset.vue';

const show = shallowRef<boolean>(false);

const filterFields = computed<FilterField[]>(() => [
  {
    label: 'Asset',
    field: 'asset',
    optionField: 'nameOptions',
    placeholder: 'Select Asset Name',
    type: 'multiselect',
    fetchOptionFn: getFilterOptions,
  },
  {
    label: 'Group',
    field: 'groupOptions',
    optionField: 'groupOptions',
    placeholder: 'Select Group',
    type: 'multiselect',
    fetchOptionFn: getFilterOptions,
  },
  {
    label: 'Brand',
    field: 'brand',
    optionField: 'brandOptions',
    placeholder: 'Select Brand',
    type: 'multiselect',
    fetchOptionFn: getFilterOptions,
  },
  {
    label: 'Model/Type',
    optionField: 'typeOptions',
    field: 'type',
    placeholder: 'Select Model/Type',
    type: 'multiselect',
    fetchOptionFn: getFilterOptions,
  },
]);

const getFilterOptions = async (
  params: GetOptionParams,
): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> => {
  return await AssetServices.getAssetsOptions(params);
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabltoolbars">
    <ButtonSearch />

    <ButtonFilter table-name="asset-list" />

    <Button
      @click="show = true"
      icon="add-line"
      label="Register"
      severity="secondary"
    />
  </div>

  <FilterContainer :fields="filterFields" table-name="asset-list" />

  <DialogFormAsset v-model:visible="show" />
</template>
