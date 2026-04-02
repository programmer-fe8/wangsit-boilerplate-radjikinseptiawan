<script lang="ts" setup>
import { Image } from '@fewangsit/wangsvue';
import { onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

import AssetServices from '@/services/assets.service';
import { AssetDetail } from '@/types/assets.type';

const route = useRoute();

const detailAssets = shallowRef<AssetDetail | undefined>();
const FetchDetailAsset = async (): Promise<void> => {
  try {
    const response = await AssetServices.getDetailAsset(
      route.params.id as string,
    );
    const value = response.data;
    detailAssets.value = value.data;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  FetchDetailAsset();
});
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <div class="flex justify-between w-full h-[34px] items-center">
      <span class="font-semibold text-grayscale-900 text-[20px]">{{
        detailAssets?.name
      }}</span>

      <div class="flex justify-end text-general-400 items-end flex-col">
        <span class="text-[10px]">Last Modified</span>

        <span class="text-[10px] text-grayscale-900"
          >{{ detailAssets?.updatedAt }} By {{ detailAssets?.updatedBy }}</span
        >
      </div>
    </div>

    <div class="flex gap-6">
      <Image :src="detailAssets?.assetImage" size="big" />

      <div class="w-full flex flex-col gap-1">
        <span class="font-semibold text-[14px]">General Information</span>

        <div class="grid grid-cols-2 gap-2">
          <!--
            TODO: Rather than multiple divs and spans, you should utiliize v-for
            and a computed property so that you only need to use one div
            and two spans. This is to reduce code duplication.
          -->
          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Brand</span>

            <span class="text-[12px]">{{ detailAssets?.brand }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Model/Type</span>

            <span class="text-[12px]">{{ detailAssets?.model }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Category</span>

            <span class="text-[12px]">{{ detailAssets?.category }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Group</span>

            <span class="text-[12px]">{{ detailAssets?.group }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
