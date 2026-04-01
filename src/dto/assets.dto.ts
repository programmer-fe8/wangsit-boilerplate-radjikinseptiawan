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
