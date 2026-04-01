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
import { shallowRef, useTemplateRef } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';
import { Asset } from '@/types/assets.type';

const props = defineProps<{
  asset?: Asset;
}>();

const visible = defineModel<boolean>('visible', { required: true });
const toast = useToast();
const dialogForm = useTemplateRef<DialogForm>('dialogForm');

const options = shallowRef<FilterOptions<GetOptionParams>>();
const getOptions = async (params: GetOptionParams): Promise<void> => {
  const { data } = await AssetServices.getAssetsOptions(params);
  options.value = data.data;
};

const onSubmitPut = async (payload: FormPayload): Promise<void> => {
  try {
    const id = props.asset?._id;
    if (!id) {
      return;
    }
    const response = await AssetServices.putAssets(payload, id);

    if (!response) {
      toast.add({
        severity: 'error',
        message:
          'Error, failed to edit asset. Please check your connection and try again.',
        life: 3000,
      });
    }
    toast.add({
      severity: 'success',
      message: 'Success, asset has been edited.',
      life: 3000,
    });
  } catch (e) {
    console.error(e);
  }
};

const onSubmitPost = async (payload: FormPayload): Promise<void> => {
  try {
    const response = await AssetServices.postAssets(payload);
    if (!response) {
      toast.add({
        severity: 'error',
        message:
          'Error, failed to register asset. Please check your connection and try again.',
        life: 3000,
      });
    }
    toast.add({
      severity: 'success',
      message: 'Success, asset has been registered.',
      life: 3000,
    });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <DialogForm
    ref="dialogForm"
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :header="props.asset ? 'Edit Asset' : 'Register Asset'"
    @show="props.asset ? dialogForm?.setValues(props.asset) : undefined"
    @submit="props.asset ? onSubmitPut($event) : onSubmitPost($event)"
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
          field-name="category"
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
          :disabled="
            !dialogForm?.form?.values.group ||
            !dialogForm.form.values.category ||
            !dialogForm.form.values.name
          "
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
          :disabled="
            !dialogForm?.form?.values.group ||
            !dialogForm.form.values.category ||
            !dialogForm.form.values.name ||
            !dialogForm.form.values.brand
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

      <ImageCompressor field-name="assetImage" />
    </template>
  </DialogForm>
</template>
