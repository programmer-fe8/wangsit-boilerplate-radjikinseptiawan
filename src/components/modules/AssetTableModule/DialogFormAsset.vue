<!--
  TODO: There are 6 things on this dialog that doesn't match the figma design, try to identify and fix them.
  Hint: It's not related to tailwind classes or any of the TODOs below.
-->
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

/*
 * TODO: Add blank lines between variable groups
 *
 * I already added this TODO before in another file. If you're going to fix something,
 * be careful not to repeat the same mistakes again.
 */
const visible = defineModel<boolean>('visible', { required: true });
const toast = useToast();
const dialogForm = useTemplateRef<DialogForm>('dialogForm');

const options = shallowRef<FilterOptions<GetOptionParams>>();
const getOptions = async (params: GetOptionParams): Promise<void> => {
  // TODO: All API calls should be wrapped in a try/catch
  const { data } = await AssetServices.getAssetsOptions(params);
  options.value = data.data;
};

// TODO: Rename this function to editAsset, the current name is confusing
const onSubmitPut = async (payload: FormPayload): Promise<void> => {
  try {
    const id = props.asset?._id;
    /*
     * TODO: You should change the condition to `if (id)`, and wrap the whole try block
     * in this if statement. This is related to how cypress tests work. I'll explain in
     * more detail once you start working on cypress tests.
     */
    if (!id) {
      return;
    }
    const response = await AssetServices.putAssets(payload, id);

    // TODO: The error toasts should be moved to the catch block, do this for both functions
    if (!response) {
      toast.add({
        severity: 'error',
        message:
          // TODO: Delete the `Please check your...` part of the message, it's already handled by the component.
          'Error, failed to edit asset. Please check your connection and try again.',
        // TODO: Unless specified in the design, don't set the life of toasts, it already has a default value
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

// TODO: Rename this function to registerAsset
const onSubmitPost = async (payload: FormPayload): Promise<void> => {
  try {
    const response = await AssetServices.postAssets(payload); // TODO: Add blank lines to improve readability, such as below this line. Blank lines can improve readability because they add a visual break between groups of code, making it easier to understand and navigate.
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
    // TODO: After submitting, the dialog shouldn't be closed if the stay after submit checkbox is checked
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

        <!-- TODO: As I've explained before, all inputs in a form must use the use-validator and field-name prop -->
        <InputText
          :validator-message="{ empty: 'You must pick a alias name' }"
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          label="Alias Name"
        />

        <!--
          TODO: This `disabled` condition is too complex, move it to a computed property
          Reference: https://fewangsit.gitbook.io/vue/docs/style-guide/code-consistency-guidelines/vue-specific-guidelines#id-1.1-keep-templates-simple
        -->
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

        <!--
          TODO: The condition should only be `!dialogForm?.form?.values.brand`,
          because the `brand` field is already disabled when the `group`, `category`
          or `name` fields are empty.
        -->
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
