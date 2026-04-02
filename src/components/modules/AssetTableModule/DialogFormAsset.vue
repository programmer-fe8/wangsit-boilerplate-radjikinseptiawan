<script lang="ts" setup>
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { FilterOptions } from '@fewangsit/wangsvue/filtercontainer';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { computed, shallowRef, useTemplateRef } from 'vue';

import { AddAssets, EditAssets, GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';
import { Asset } from '@/types/assets.type';

const props = defineProps<{
  asset?: Asset;
}>();

const visible = defineModel<boolean>('visible', { required: true });

const toast = useToast();

const dialogForm = useTemplateRef<DialogForm>('dialogForm');

const options = shallowRef<FilterOptions<GetOptionParams>>();

const isDisabled = computed<boolean>(() => {
  const value = dialogForm.value?.form?.values;

  return !value?.group || !value.name || !value.category;
});

const getOptions = async (params: GetOptionParams): Promise<void> => {
  try {
    const { data } = await AssetServices.getAssetsOptions(params);
    options.value = data.data;
  } catch (e) {
    console.error(e);
  }
};

const editAsset = async (payload: FormPayload): Promise<void> => {
  try {
    const id = props.asset?._id;
    if (id) {
      await AssetServices.editAsset(payload.formValues as EditAssets, id);
      toast.add({
        severity: 'success',
        message: 'asset has been edited.',
      });
    }
  } catch (error) {
    toast.add({
      message: 'failed to edit asset.',
      error,
    });
    payload.stayAfterSubmit = true;
  }
};

const registerAsset = async (payload: FormPayload): Promise<void> => {
  try {
    const response = await AssetServices.registerAsset(
      payload.formValues as AddAssets,
    );
    if (response) {
      toast.add({
        severity: 'success',
        message: 'asset has been registered.',
      });
    }
  } catch (error) {
    toast.add({
      message: 'failed to register asset.',
      error,
    });
    console.error(error);
    payload.stayAfterSubmit = true;
  }
};
</script>

<template>
  <DialogForm
    ref="dialogForm"
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :close-on-submit="false"
    :header="props.asset ? 'Edit Asset' : 'Register Asset'"
    :reset-after-submit="false"
    :submit-btn-label="props.asset ? 'Edit' : 'Create'"
    @show="props.asset ? dialogForm?.setValues(props.asset) : undefined"
    @submit="props.asset ? editAsset($event) : registerAsset($event)"
    show-stay-checkbox
    width="semi-xlarge"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-3">
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
        />

        <Dropdown
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

        <InputText
          :validator-message="{ empty: 'You must pick a alias name' }"
          field-info="You can input an alias name for convenience in searching for &#10; assets and to differentiate them from others."
          field-name="aliasName"
          label="Alias Name"
          show-optional-text
          use-validator
        />

        <Dropdown
          :disabled="isDisabled"
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
          :disabled="!dialogForm?.form?.values.brand"
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

      <ImageCompressor
        :use-delete-button="props.asset ? true : false"
        field-name="assetImage"
        label="Photo"
      />
    </template>
  </DialogForm>
</template>
