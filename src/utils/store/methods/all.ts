import * as coreMethods from "./core";
import * as numbersMethods from "./numbers";
import * as stringMethods from "./strings";
import * as arrayMethods from "./arrays";
import * as objectMethods from "./objects";

const allMethods = {
  ...coreMethods,
  ...numbersMethods,
  ...stringMethods,
  ...arrayMethods,
  ...objectMethods
};

export default allMethods;