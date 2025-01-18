import Numbers from "./numbers";

export default abstract class Arrays extends Numbers{
  push(...value) {
    let list = this.value();

    if (!Array.isArray(list)) throw new Error("You can only push to arrays.");

    list.push(...value);
    this.set(list);

    return this;
  }
  pushSet(...value) {
    let list = this.value();

    if (!Array.isArray(list)) throw new Error("You can only push to arrays.");

    let newList = Array.from(value)
    value.forEach(el => {
      if (list.includes(el)) {
        newList.shift()
      }
    });

    list.push(...newList);
    this.set(list);

    return this;
  }
  pull(/*amount,*/ {getList = false, save = false}) {
    let list = this.value();
    if (!Array.isArray(list)) throw new Error("You can only pull from arrays.");

    let popped = list.pop();

    if (save) this.set(list);
    if (getList) return popped;

    return this;
  }
  shift({getList = false, save = false}) {
    let list = this.value();
    if (!Array.isArray(list)) throw new Error("You can only shift arrays.");

    let shifted = list.shift();

    if (save) this.set(list);
    if (getList) return shifted;

    return this;
  }
  unshift(...value) {
    let list = this.value();
    if (!Array.isArray(list)) throw new Error("You can only unshift arrays.");

    list.unshift(...value);
    this.set(list);

    return this;
  }
  every(func) {
    let list = this.value();

    if (typeof func !== "function")
      throw new Error("You can only pass functions to .every().");
    if (!Array.isArray(list)) throw new Error("You can only check arrays.");

    let boolean = list.every(func);

    return boolean;
  }
  some(func) {
    let list = this.value();

    if (typeof func !== "function")
      throw new Error("You can only pass functions to .some().");
    if (!Array.isArray(list)) throw new Error("You can only check arrays.");

    let boolean = list.some(func);

    return boolean;
  }
  has(value: any): boolean {
    let list = this.value();
    // 检查是否为对象或者数组
    if (Array.isArray(list)) {
      return list.includes(value);
    } else if (typeof list === 'object' && list !== null) {
      return Object.keys(list).includes(value);
    } else {
      throw new Error("You can only check arrays or objects.");
    }
  }
  
  map(func, save = false) {
    let list = this.value();

    if (typeof func !== "function")
      throw new Error("You can only pass functions to .map().");
    if (!Array.isArray(list)) throw new Error("You can only map arrays.");

    list = list.map(func);

    if (save) {
      this.set(list);
      return this
    }
    return list;
  }
  sort(func, save = false) {
    let list = this.value();

    if (typeof func !== "function" && func !== undefined)
      throw new Error("You can only pass functions or nothing to .sort().");
    if (!Array.isArray(list)) throw new Error("You can only sort arrays.");

    list.sort(func);

    if (save) {
      this.set(list);
      return this
    }
    return list;
  }
  filter(func, save = false) {
    let list = this.value();

    if (typeof func !== "function")
      throw new Error("You can only pass functions to .filter().");
    if (!Array.isArray(list)) throw new Error("You can only filter arrays.");

    list = list.filter(func);

    if (save) {
      this.set(list);
      return this
    }
    return list;
  }
  reduce(func, save = false) {
    let list = this.value();

    if (typeof func !== "function")
      throw new Error("You can only pass functions to .reduce().");
    if (!Array.isArray(list)) throw new Error("You can only reduce arrays.");

    let reducedValue = list.reduce(func);

    if (save) {
      this.set(reducedValue);
      return this
    }
    return reducedValue;
  }
  length() {
    let value = this.value()
    if (value.length == undefined) throw new Error("Cannot get length.");

    return value.length
  }
}