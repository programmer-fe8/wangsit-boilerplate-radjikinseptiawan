/*
 * TODO: This already had the correct name, `Asset`, change it to that. My previous todo
 * was made because you didn't rename the interface with the `F2` key.
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
