<script lang="ts" setup>
import { Dropdown, ImageCompressor, InputBadge } from '@fewangsit/wangsvue';
import {
  FetchOptionResponse,
  FilterField,
} from '@fewangsit/wangsvue/filtercontainer';
import { ImageCompressorPayload } from '@fewangsit/wangsvue/imagecompressor';
import { AxiosResponse } from 'axios';
import { computed } from 'vue';

import { GetOptionParams } from '@/dto/assets.dto';
import AssetServices from '@/services/assets.service';

const onApply = (payload: ImageCompressorPayload): void => {
  // eslint-disable-next-line no-console
  console.log('image compressed', payload);
};

const getFilterOptions = async (
  params: GetOptionParams,
): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> => {
  return await AssetServices.getAssetsOptions(params);
};
</script>

<template>
  <div class="flex gap-12" show-stay-checkbox>
    <div class="w-[552px]">
      <Dropdown
        :validator-message="{ empty: 'You must pick a grup' }"
        label="Group"
        mandatory
        option-label="Group"
        option-value="groupOptions"
        use-validator
      />

      <Dropdown
        :validator-message="{ empty: 'You must pick a name' }"
        label="Name"
        mandatory
        option-label="Name"
        use-validator
      />

      <Dropdown
        :validator-message="{ empty: 'You must pick a brand' }"
        label="Brand"
        mandatory
        option-label="Brand"
        use-validator
      />
    </div>

    <div class="w-[552px]">
      <Dropdown
        :validator-message="{ empty: 'You must pick a category' }"
        label="Category"
        mandatory
        option-label="Category"
        use-validator
      />

      <InputBadge
        :validator-message="{ empty: 'You must pick a alias name' }"
        field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
        label="Alias Name"
        mandatory
        option-label="Alias Name"
        use-validator
      />

      <Dropdown
        :validator-message="{ empty: 'You must pick a Model/Type' }"
        label="Model/Type"
        mandatory
        option-label="Model/Type"
        use-validator
      />
    </div>
  </div>

  <ImageCompressor @apply="onApply" />
</template>
