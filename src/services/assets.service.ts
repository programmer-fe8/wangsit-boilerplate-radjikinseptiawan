import { FetchListResponse } from '@fewangsit/wangsvue/datatable';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchDetailResponse } from 'node_modules/@fewangsit/workspace-api-services/src/types/fetchResponse.type';

import {
  AddAssets,
  EditAssets,
  GetAssetsParams,
  GetOptionParams,
} from '@/dto/assets.dto';
import { Asset, AssetDetail } from '@/types/assets.type';

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
    params: GetOptionParams,
  ): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> {
    return API({ params }).get('/options');
  },

  registerAsset(body: AddAssets): Promise<AxiosResponse> {
    return API().post('', body);
  },

  getDetailAsset(
    assetId: string,
  ): Promise<AxiosResponse<FetchDetailResponse<AssetDetail>>> {
    return API().get(`/${assetId}`);
  },

  editAsset(body: EditAssets, assetId: string): Promise<AxiosResponse> {
    return API().put(`/${assetId}`, body);
  },
};

export default AssetServices;
