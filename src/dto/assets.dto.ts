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
  typeOptions?: boolean;
  categoryOptions?: boolean;
  nameOptions?: boolean;
  brandOptions?: boolean;
}
