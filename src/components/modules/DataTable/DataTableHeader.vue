<!-- eslint-disable no-console -->
<script lang="ts" setup>
import {
  Button,
  ButtonFilter,
  ButtonSearch,
  DialogForm,
  FilterContainer,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { ImageCompressorPayload } from '@fewangsit/wangsvue/imagecompressor';
import { AxiosResponse } from 'axios';
import { computed, shallowRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

const show = shallowRef<boolean>(false);

const getFilterOptions = async (
  params: GetOptionParams,
): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> => {
  return await AssetServices.getAssetsOptions(params);
};

const filterFields = computed<FilterField[]>(() => {
  return [
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
  ];
});

const onApply = (payload: ImageCompressorPayload): void => {
  console.log('image compressed', payload);
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabltoolbars">
    <ButtonSearch />

    <ButtonFilter table-name="asset-list" />

    <Button class="border-0" icon="history-line" severity="none" />

    <Button @click="show = true" label="+ Register" severity="secondary" />
  </div>

  <FilterContainer :fields="filterFields" table-name="asset-list" />

  <DialogForm
    v-model:visible="show"
    :buttons-template="['submit', 'clear']"
    header="Register Asset"
    show-stay-checkbox
  >
    <template #fields>
      <div class="flex gap-5">
        <div>
          <InputText
            :validator-message="{ empty: 'You must pick a grup' }"
            label="Group"
            mandatory
            use-validator
          />

          <InputText
            :validator-message="{ empty: 'You must pick a name' }"
            label="Name"
            mandatory
            use-validator
          />

          <InputText
            :validator-message="{ empty: 'You must pick a brand' }"
            label="Brand"
            mandatory
            use-validator
          />
        </div>

        <div>
          <InputText
            :validator-message="{ empty: 'You must pick a category' }"
            label="Category"
            mandatory
            use-validator
          />

          <InputText
            :validator-message="{ empty: 'You must pick a alias name' }"
            label="Alias Name"
            mandatory
            use-validator
          />

          <InputText
            :validator-message="{ empty: 'You must pick a Model/Type' }"
            label="Model/Type"
            mandatory
            use-validator
          />
        </div>
      </div>

      <ImageCompressor @apply="onApply" />
    </template>
  </DialogForm>
</template>
