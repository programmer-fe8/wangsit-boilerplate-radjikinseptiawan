import { QueryParams } from '@fewangsit/wangsvue/datatable';

export interface GetAssetsParams extends QueryParams {
  assetName?: string;
  group?: string;
  category?: string;
  brand?: string;
  type?: string;
  alias?: string;
}

export interface GetOptionParams {
  modelOptions?: boolean;
  categoryOptions?: boolean;
  nameOptions?: boolean;
  groupOptions?: boolean;
  brandOptions?: boolean;
}

export interface AddAssets {
  category: string;
  brand: string;
  model: string;
  group: string;
  aliasName: string;
  name: string;
  assetImage: string;
}

export interface EditAssets {
  category: string;
  brand: string;
  model: string;
  group: string;
  aliasName: string;
  name: string;
  assetImage: string;
}
