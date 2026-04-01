<script lang="ts" setup>
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { FilterOptions } from '@fewangsit/wangsvue/filtercontainer';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { ImageCompressorPayload } from '@fewangsit/wangsvue/imagecompressor';
import { shallowRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

const visible = defineModel<boolean>('visible', { required: true });

const options = shallowRef<FilterOptions<GetOptionParams>>();

const getOptions = async (params: GetOptionParams): Promise<void> => {
  const { data } = await AssetServices.getAssetsOptions(params);
  options.value = data.data;
};

const onSubmit = (payload: FormPayload) => {
  console.log('form submitted', payload.formValues);
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    @submit="onSubmit"
    header="Register Asset"
    show-stay-checkbox
    width="semi-xlarge"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-3" show-stay-checkbox>
        <Dropdown
          :options="options?.groupOptions"
          :validator-message="{ empty: 'You must pick a grup' }"
          @show="getOptions({ groupOptions: true })"
          field-name="group"
          label="Group"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
          visible
        />

        <Dropdown
          :options="options?.nameOptions"
          :validator-message="{ empty: 'You must pick a name' }"
          @show="getOptions({ nameOptions: true })"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />

        <Dropdown
          :options="options?.categoryOptions"
          :validator-message="{ empty: 'You must pick a category' }"
          @show="getOptions({ categoryOptions: true })"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />

        <InputText
          :validator-message="{ empty: 'You must pick a alias name' }"
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          label="Alias Name"
        />

        <Dropdown
          :options="options?.brandOptions"
          :validator-message="{ empty: 'You must pick a brand' }"
          @show="getOptions({ brandOptions: true })"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />

        <Dropdown
          :options="options?.typeOptions"
          :validator-message="{ empty: 'You must pick a Model/Type' }"
          @show="getOptions({ typeOptions: true })"
          disabled
          field-name="model"
          label="Model/Type"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />
      </div>

      <ImageCompressor field-name="imageAsset" />
    </template>
  </DialogForm>
</template>
