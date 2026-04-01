import { FetchListResponse } from '@fewangsit/wangsvue/datatable';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { GetAssetsParams, GetOptionParams } from '@/dto/assets.dto';
import { Asset } from '@/types/assets.type';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL();

  const instance = axios.create({
    baseURL: `${BASE_URL}/v2/assets`,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const AssetServices = {
  getAssets(
    params: GetAssetsParams,
  ): Promise<AxiosResponse<FetchListResponse<Asset>>> {
    return API({ params }).get('');
  },

  getAssetsOptions(
    // TODO: Use the correct param type
    params: GetAssetsParams,
  ): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> {
    return API({ params }).get('/options');
  },

  /*
   * TODO: Post endpoints don't use params, they instead use body:
   * return API().post('', body);
   * Make sure the body's type matches the body in the API spec I gave to you.
   *
   * TODO: Rename this function to registerAsset, it describes what it does more accurately.
   * Remember to rename it with `F2`, you should make a habit of renaming anything with `F2`.
   */
  postAssets(
    params: GetAssetsParams,
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API({ params }).post('');
  },

  getDetailAssets(
    params: GetAssetsParams,
    assetId: string,
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API({ params }).get(`/${assetId}`);
  },

  /*
   * TODO: Same as the post endpoint, this should have a body, not params.
   * TODO: Rename this function to editAsset
   */
  putAssets(
    params: GetAssetsParams,
    assetId: string,
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API({ params }).put(`/${assetId}`);
  },
};

export default AssetServices;
