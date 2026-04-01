<script lang="ts" setup>
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { FilterOptions } from '@fewangsit/wangsvue/filtercontainer';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { ref, shallowRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

const visible = defineModel<boolean>('visible', { required: true });

interface DropValueDataType {
  category: string;
  brand: string;
  model: string;
  group: string;
  name: string;
  aliasName: string;
  assetImage: string;
}

const options = shallowRef<FilterOptions<GetOptionParams>>();
const dropValue = ref<DropValueDataType>({
  model: '',
  brand: '',
  group: '',
  name: '',
  aliasName: '',
  assetImage: '',
  category: '',
});
const getOptions = async (params: GetOptionParams): Promise<void> => {
  const { data } = await AssetServices.getAssetsOptions(params);
  options.value = data.data;
};

const onSubmit = async (payload: FormPayload): Promise<void> => {
  try {
    const response = await AssetServices.postAssets(payload);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};

console.log(dropValue.value);
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
          v-model="dropValue.group"
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
          v-model="dropValue.name"
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
          v-model="dropValue.category"
          :options="options?.categoryOptions"
          :validator-message="{ empty: 'You must pick a category' }"
          @show="getOptions({ categoryOptions: true })"
          field-name="category"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />

        <InputText
          v-model="dropValue.aliasName"
          :validator-message="{ empty: 'You must pick a alias name' }"
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          label="Alias Name"
        />

        <Dropdown
          v-model="dropValue.brand"
          :disabled="!dropValue.name || !dropValue.category || !dropValue.group"
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
          v-model="dropValue.model"
          :disabled="
            !dropValue.name ||
            !dropValue.category ||
            !dropValue.brand ||
            !dropValue.group
          "
          :options="options?.modelOptions"
          :validator-message="{ empty: 'You must pick a Model/Type' }"
          @show="getOptions({ modelOptions: true })"
          field-name="model"
          label="Model/Type"
          mandatory
          option-label="label"
          option-value="value"
          use-validator
        />
      </div>

      <ImageCompressor v-model="dropValue.assetImage" field-name="assetImage" />
    </template>
  </DialogForm>
</template>
