<script lang="ts" setup>
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputBadge,
} from '@fewangsit/wangsvue';
import { FilterOptions } from '@fewangsit/wangsvue/filtercontainer';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { ImageCompressorPayload } from '@fewangsit/wangsvue/imagecompressor';
import { shallowRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

const visible = defineModel<boolean>('visible', { required: true });

const optionsDataSelector = shallowRef<FilterOptions<GetOptionParams>>();

const getOptionsSelector = async (params: GetOptionParams): Promise<void> => {
  const { data } = await AssetServices.getAssetsOptions(params);
  optionsDataSelector.value = data.data;
};

const onApply = (payload: ImageCompressorPayload): void => {
  // Payload;
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
      <div class="flex gap-3" show-stay-checkbox>
        <div class="w-[552px] flex flex-col gap-3">
          <Dropdown
            :options="optionsDataSelector?.groupOptions"
            :validator-message="{ empty: 'You must pick a grup' }"
            @show="getOptionsSelector"
            field-name="group"
            label="Group"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
            visible
          />

          <Dropdown
            :options="optionsDataSelector?.nameOptions"
            :validator-message="{ empty: 'You must pick a name' }"
            @show="getOptionsSelector"
            field-name="name"
            label="Name"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />

          <Dropdown
            :options="optionsDataSelector?.brandOptions"
            :validator-message="{ empty: 'You must pick a brand' }"
            @show="getOptionsSelector"
            disabled
            field-name="brand"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>

        <div class="w-[552px] flex flex-col gap-3">
          <Dropdown
            :options="optionsDataSelector?.categoryOptions"
            :validator-message="{ empty: 'You must pick a category' }"
            @show="getOptionsSelector"
            label="Category"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />

          <InputBadge
            :validator-message="{ empty: 'You must pick a alias name' }"
            field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
            label="Alias Name"
          />

          <Dropdown
            :options="optionsDataSelector?.typeOptions"
            :validator-message="{ empty: 'You must pick a Model/Type' }"
            @show="getOptionsSelector"
            disabled
            field-name="model"
            label="Model/Type"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>
      </div>

      <ImageCompressor @apply="onApply" class="gap-3" />
    </template>
  </DialogForm>
</template>
