export default {
  default (defaultValue) {
    let stateEmpty = Object.keys(this.state).length === 0 && this.state.constructor === Object;
    if (stateEmpty) this.state = defaultValue;

    return this;
  },
  value() {
    let data = this.state;
    for (let i = 0; i < this.pointers.length; i++) {
      if (i < this.pointers.length - 1 && !data[this.pointers[i]]) {
        return undefined
      }
      data = data[this.pointers[i]];
    }
    return data;
  },
  get(value) {
    let extraPointers;
    if (typeof value === "string") extraPointers = value.split(".");
    else extraPointers = [value];

    let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    clone.pointers = [...clone.pointers, ...extraPointers];
    return clone;
  },
  set(key, value) {
    if (value === undefined) {
      this.setValue(key);
    } else {
      let extraPointers;
      if (typeof key === "string") extraPointers = key.split(".");
      else extraPointers = [key];

      this.setValue(value, extraPointers);
    }
    return this;
  },
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
  },
  rename (newName) {
    let value = this.value();
    let target = this.pointers.pop()
    let place = this.value();

    if (value == undefined) throw new Error("You cannot rename this, check your .get()s");
    if (newName == target) return this

    delete place[target]
    place[newName] = value
    this.pointers.push(newName)

    return this
  },
  delete() {
    let enclosing = this.state;
    for (let i = 0; i < this.pointers.length - 1; i++) {
      enclosing = enclosing[this.pointers[i]];
    }

    let final = this.pointers[this.pointers.length - 1];

    if (Array.isArray(enclosing)) {
      enclosing.splice(final, 1);
    } else {
      delete enclosing[final];
    }

    return this
  },
  save() {
    return this.engine.write(this.state);
  },
  read() {
    return this.state = this.engine.read()
  }
}