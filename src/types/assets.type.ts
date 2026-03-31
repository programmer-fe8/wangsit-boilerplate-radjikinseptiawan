/*
 * TODO: The name of this interface should be `Asset`, not `Assets`, because this interface only represents a single asset.
 * A quick tip, to rename an instance on all files, put your cursor on the instance name, then press `F2`.
 */
export interface Assets {
  _id: string;
  key: number;
  assets?: string;
  group?: string;
  category?: string;
  brand: string;
  type: string[];
  alias: string;
}
