export interface LocalStorageType {
  getItem<T>(key: string): Promise<T | undefined>;
  setItem(key: string, data: any): Promise<void>;
  removeItem(key: string): Promise<void>;
}
