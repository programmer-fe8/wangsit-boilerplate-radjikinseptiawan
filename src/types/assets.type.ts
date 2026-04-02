export interface Asset {
  _id: string;
  key: number;
  assets?: string;
  group?: string;
  category?: string;
  brand: string;
  type: string[];
  alias: string;
}

export interface AssetDetail {
  aliasName: string;
  assetImage: string;
  assetNumber: number;
  brand: string;
  category: string;
  createdAt: string;
  group: string;
  model: string;
  name: string;
  updatedAt: string;
  updatedBy: string;
  _id: string;
}
