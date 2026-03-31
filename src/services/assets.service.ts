import { FetchListResponse } from '@fewangsit/wangsvue/datatable';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { GetAssetsParams, GetOptionParams } from '@/dto/assets.dto';
import { Assets } from '@/types/assets.type';

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
  ): Promise<AxiosResponse<FetchListResponse<Assets>>> {
    return API({ params }).get('');
  },

  getAssetsOptions(
    params: GetAssetsParams,
  ): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> {
    return API({ params }).get('/options');
  },
};

export default AssetServices;
