export class SealdiceEngine {
  ext: seal.ExtInfo;
  // 允许用户修改extkey，如果不修改，不允许重复初始化（考虑？）
  namespace: string;
  serialize: (value: any) => string;
  deserialize: (value: string) => any;
  constructor(ext: seal.ExtInfo,namespace?: string) {
    this.ext = ext
    this.namespace = namespace || ""
    this.serialize = JSON.stringify;
    this.deserialize = JSON.parse;
  }

  init() {
    return this.deserialize(this.ext.storageGet(this.namespace) || '{}')
  }

  read() {
    try {
      let json = this.deserialize(this.ext.storageGet(this.namespace) || '{}');
      return json;
    } catch (error) {
      error.message =
        "Failed to load Sealdice-StormDB database file - invalid or corrupted format.";
      throw error;
    }
  }
  // 曾经这里有 async 方法，BUT我不知道怎么做
  write(data) {
    this.ext.storageSet(this.namespace, this.serialize(data));
    return null;
  }
}