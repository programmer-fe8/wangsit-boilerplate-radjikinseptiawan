<script lang="ts" setup>
import { Image } from '@fewangsit/wangsvue';
import { onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

import AssetServices from '@/services/assets.service';
import { Asset, AssetDetail } from '@/types/assets.type';

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
  console.log(detailAssets);
});
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <div class="flex justify-between w-full h-[34px] items-center">
      <span class="font-semibold text-[20px]">{{ detailAssets?.name }}</span>

      <div class="flex justify-end items-end flex-col">
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
          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Brand</span>

            <span class="text-[12px]">Daihatsu</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Model/Type</span>

            <span class="text-[12px]">Grand Max PU</span>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Category</span>

            <span class="text-[12px]"
              >Kategori > Kendaraan > Mobil Operasional</span
            >
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-general-500">Group</span>

            <span class="text-[12px]">Kacab 1 > Gedung A > Pengadaan</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
