import { SealdiceEngine } from "./engine/sealdice";

// import allMethods from "./methods/all"; // 导入 all.js 中的所有方法
import Strings from "./methods/strings";

class StormDB extends Strings{
  engine: SealdiceEngine;
  state: any;
  pointers: any[];
  constructor(engine) {
    super();
    this.engine = engine;
    this.state = this.engine.init();
    this.pointers = [];
  }
}

//adding the other methods
// StormDB.prototype = Object.assign(StormDB.prototype, allMethods);
export default StormDB;