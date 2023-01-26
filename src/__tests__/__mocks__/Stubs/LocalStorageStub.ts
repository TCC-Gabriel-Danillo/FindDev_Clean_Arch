import { LocalStorageType } from "_/data/protocols/cache/localStorage";

export class LocalStorageStub implements LocalStorageType {
  private item: any;

  getItem = jest.fn((key: string) => {
    return this.item;
  });
  setItem = jest.fn((key: string, data: any) => {
    this.item = data;
    return Promise.resolve();
  });
  removeItem = jest.fn((key: string) => {
    this.item = null;
    return Promise.resolve();
  });
}
