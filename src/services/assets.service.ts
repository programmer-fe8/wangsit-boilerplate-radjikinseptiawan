import { FetchListResponse } from '@fewangsit/wangsvue/datatable';
import { FetchOptionResponse } from '@fewangsit/wangsvue/filtercontainer';
import { FormPayload } from '@fewangsit/wangsvue/form';
import { getBaseURL } from '@fewangsit/workspace-api-services';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchDetailResponse } from 'node_modules/@fewangsit/workspace-api-services/src/types/fetchResponse.type';

import { GetAssetsParams, GetOptionParams } from '@/dto/assets.dto';
import { AssetDetail } from '@/types/assets.type';

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
    /*
     * TODO: Because you imported AssetDetail, you made this error.
     * Make a habit of importing types with Ctrl + Space, not by typing it manually.
     */
  ): Promise<AxiosResponse<FetchListResponse<Asset>>> {
    return API({ params }).get('');
  },

  getAssetsOptions(
    params: GetOptionParams,
  ): Promise<AxiosResponse<FetchOptionResponse<GetOptionParams>>> {
    return API({ params }).get('/options');
  },

  registerAsset(
    /*
     * TODO: Make sure the body's type matches the body in the API spec I gave to you (also for the edit endpoint).
     *
     * I made this comment previously, but you didn't fix it correctly. I think this is another case
     * where you should've asked me about how to fix it, but you didn't. Maybe you just assumed you
     * knew how to fix it?
     *
     * Again I remind you, please ask me more questions.
     * I'd rather you ask me 10 questions than I have to add 1 TODO comment.
     */
    body: FormPayload,
    /*
     * TODO: The response type of non-get endpoints should just be `Promise<AxiosResponse>`
     * Also change this for the edit endpoint.
     */
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API().post('', body);
  },

  getDetailAsset(
    assetId: string,
  ): Promise<AxiosResponse<FetchDetailResponse<AssetDetail>>> {
    return API().get(`/${assetId}`);
  },

  editAsset(
    body: FormPayload,
    assetId: string,
  ): Promise<AxiosResponse<FetchListResponse<GetOptionParams>>> {
    return API().put(`/${assetId}`, body);
  },
};

export default AssetServices;
