export default class BaseRule {
  constructor(options) {
    this.options = options;
  }

  isValid(value) {
    throw new Error(`"isValid" method should be implemented in "${this.constructor.name}"`);
    //let validator = this.getValidator();
    //return validator(value);
  }

  //getValidator() {
  //  throw new Error(`"getValidator" method should be implemented in "${this.constructor.name}"`);
  //}

  isEmpty(value) {
    return value === undefined || value === null;
  }
}
