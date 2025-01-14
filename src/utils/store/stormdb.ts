import { SealdiceEngine } from "./engine/sealdice";

import * as allMethods from "./methods/all"; // 导入 all.js 中的所有方法

class StormDB {
  engine: SealdiceEngine;
  state: any;
  pointers: any[];
  constructor(engine) {
    this.engine = engine;
    this.state = this.engine.init();
    this.pointers = [];
  }
}

//adding the other methods
Object.setPrototypeOf(StormDB.prototype, allMethods);

export default StormDB;