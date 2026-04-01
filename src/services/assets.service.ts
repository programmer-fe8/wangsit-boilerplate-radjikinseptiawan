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
    params: GetAssetsParams,
  ): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> {
    return API({ params }).get('/options');
  },

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

  putAssets(
    params: GetAssetsParams,
    assetId: string,
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API({ params }).put(`/${assetId}`);
  },
};

export default AssetServices;
