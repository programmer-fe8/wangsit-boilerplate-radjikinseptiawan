<script lang="ts" setup>
import { Image } from '@fewangsit/wangsvue';
import { computed, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

import AssetServices from '@/services/assets.service';
import { AssetDetail } from '@/types/assets.type';

onMounted(async () => {
  await FetchDetailAsset();
});

const route = useRoute();

const detailAssets = shallowRef<AssetDetail | undefined>();

const mappingAsset = computed(() => {
  if (!detailAssets.value) return [];

  return [
    {
      field: 'alias name',
      value: detailAssets.value?.aliasName ?? '-',
    },
    {
      field: 'category',
      value: detailAssets.value?.category ?? '-',
    },
    {
      field: 'group',
      value: detailAssets.value?.group ?? '-',
    },
    {
      field: 'model',
      value: detailAssets.value?.model ?? '-',
    },
  ];
});

const FetchDetailAsset = async (): Promise<void> => {
  try {
    const { data } = await AssetServices.getDetailAsset(
      route.params.id as string,
    );

    detailAssets.value = data.data;
  } catch (e) {
    console.error(e);
  }
};
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
          <div
            :key="index"
            v-for="(item, index) in mappingAsset"
            class="flex flex-col"
          >
            <span class="text-[10px] text-general-500">{{ item.field }}</span>

            <span class="text-[12px]">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
