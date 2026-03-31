<script lang="ts" setup>
/*
 * Last time you ignored this TODO. Don't delete TODOs if you haven't fixed them.
 *
 * TODO: This file shouldn't be put as a separate `Dialog` module,
 * it should still be in the same module as the other Asset components
 * Reference: https://fewangsit.gitbook.io/vue/docs/style-guide/project-structure#id-3.-components-greater-than-modules-greater-than-examplemodule
 */
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

// TODO: This ref name is too verbose. Rename this ref to `options`. Remember to rename it with the `F2` key
const optionsDataSelector = shallowRef<FilterOptions<GetOptionParams>>();

// TODO: Because the options ref is renamed, rename this function to getOptions
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
      <!--
        TODO: Rather than three flex divs, you should use one div with the `grid` class.
        And you don't need to set the div's width.
      -->
      <div class="flex gap-3" show-stay-checkbox>
        <div class="w-[552px] flex flex-col gap-3">
          <!-- TODO: On each getOptionsSelector call, you should specify which option you're getting -->
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

          <!--
            TODO: You should use InputText here, not InputBadge.
            Only use the components that I listed in the Figma comment.
          -->
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

      <!-- TODO: This class isn't useful, delete it -->
      <ImageCompressor @apply="onApply" class="gap-3" />
    </template>
  </DialogForm>
</template>
