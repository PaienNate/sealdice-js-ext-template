export class SealdiceEngine {
    ext: seal.ExtInfo;
    // TODO: 这个写死吗？
    extkey: "SEALDICE"
    // TODO: 改改这俩
    serialize: any;
    deserialize: any;
    constructor(ext:seal.ExtInfo) {
        this.ext = ext
        this.serialize = JSON.stringify;
        this.deserialize = JSON.parse;
      }
    
      init() {
        return this.deserialize(this.ext.storageGet(this.extkey) || '{}')
      }
    
      read() {
        try {
          let json = this.deserialize(this.ext.storageGet(this.extkey) || '{}');
          return json;
        } catch (error) {
          error.message =
            "Failed to load Sealdice-StormDB database file - invalid or corrupted format.";
          throw error;
        }
      }
    
      write(data) {
        // 松子不提供 async 方法，除非有人会做……
        this.ext.storageSet(this.extkey,this.serialize(data));
        return null;
      }
}

export class StormDB {
    engine: SealdiceEngine;
    state: any;
    pointers: any[];

    constructor(engine:SealdiceEngine) {
      this.engine = engine;
  
      this.state = this.engine.init();
      this.pointers = [];
    }
  
    default(defaultValue) {
      let stateEmpty =
        Object.keys(this.state).length === 0 && this.state.constructor === Object;
  
      if (stateEmpty) this.state = defaultValue;
  
      return this;
    }
  
    length() {
      this.pointers.push("length");
      return this;
    }
  
    delete() {
      let enclosing = this.state;
      for (let i = 0; i < this.pointers.length - 1; i++) {
        enclosing = enclosing[this.pointers[i]];
      }
  
      let final = this.pointers[this.pointers.length - 1];
      delete enclosing[final];
    }
  
    push(value) {
      let list = this.value();
  
      if (!Array.isArray(list)) throw new Error("You can only push to lists.");
  
      list.push(value);
      this.set(list);
  
      return this;
    }

    // 判断是否存在
    exist() {
        return this.value() !== undefined;
    }
  
    get(value) {
      let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  
      clone.pointers = [...clone.pointers];
      clone.pointers.push(value);
  
      return clone;
    }
  
    set(key, value?) {
      if (value === undefined) {
        this.setValue(key);
      } else {
        let extraPointers;
        if (typeof key === "string") extraPointers = key.split(".");
        else extraPointers = [key];
  
        this.setValue(value, extraPointers);
      }
      return this;
    }
  
    value() {
      let data = this.state;
      for (let i = 0; i < this.pointers.length; i++) {
        data = data[this.pointers[i]];
      }
  
      return data;
    }
  
    setValue(value, pointers = [], setrecursively = true) {
      let depth = 0;
  
      pointers = [...this.pointers, ...pointers];
  
      const func = (a, b) => {
        depth += 1;
  
        let finalLevel = depth === pointers.length;
        if (setrecursively && typeof a[b] === "undefined" && !finalLevel) {
          a[b] = {};
          return a[b];
        }
  
        if (finalLevel) {
          a[b] = value;
          return value;
        } else {
          return a[b];
        }
      };
      pointers.reduce(func, this.state);
    }
  
    save() {
      return this.engine.write(this.state);
    }
  }