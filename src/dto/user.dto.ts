import { QueryParams } from '@fewangsit/wangsvue/datatable';

export interface GetUsersParams extends QueryParams {
  country?: string;
  minAge?: number;
  maxAge?: number;
}

export interface GetOptionsUserParams {
  countryOptions?: string;
}
