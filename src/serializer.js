import isFunction from 'lodash/isFunction';

let _struct = Symbol('struct');
let _rules = Symbol('rules');
let _options = Symbol('options');

const DEFAULT_SERIALIZE_OPTIONS = {
  dropEmpty: true
};

export default class Serializer {
  constructor(struct, options = {}) {
    this[_struct] = struct;
    this[_rules] = new WeakMap();

    this[_options] = {
      ...DEFAULT_SERIALIZE_OPTIONS,
      ...options
    };
  }

  getRules() {
    return this[_rules];
  }

  getStruct() {
    return this[_struct];
  }

  addRule(serializer) {
    if (!isFunction(serializer)) {
      throw new Error('serialize rule should be a constructor');
    }

    this[_rules].set(serializer, new serializer(this[_options]));
  }

  encode(params) {
    let struct = this.getStruct();
    let rules = this.getRules();

    let options = this[_options];

    let encodedObject = {};

    for (let key of Object.keys(struct)) {
      if (params.hasOwnProperty(key)) {
        let ruleId = struct[key];

        if (!rules.has(ruleId)) {
          throw new Error(`rule for struct with id "${key}" does not exist`);
        }

        let value = params[key];
        let rule = rules.get(ruleId);

        let isEncodeAllowed = this.isEncodeAllowed(key, value);
        if (isEncodeAllowed) {
          if (!rule.isValid(value)) {
            throw new Error(`value with id "${key}" has wrong struct`);
          }
        }

        if (!options.dropEmpty || (options.dropEmpty && !rule.isEmpty(value))) {
          encodedObject[key] = rule.encode(value);
        }
      }
    }

    return encodedObject;
  }


  decode(params, defaults) {
    let struct = this.getStruct();
    let rules = this.getRules();

    let decodedObject = {};

    for (let key of Object.keys(struct)) {
      if (params.hasOwnProperty(key)) {
        let ruleId = struct[key];

        if (!rules.has(ruleId)) {
          throw new Error(`rule for struct with id "${key}" does not exist`);
        }

        let value = params[key];

        let rule = rules.get(ruleId);
        let decoded = rule.decode(value);

        if (rule.isEmpty(decoded) && defaults.hasOwnProperty(key)) {
          decoded = defaults[key];
        }

        decodedObject[key] = decoded;
      }
    }

    return decodedObject;
  }

  // should be overridden in child serializers
  // isEncodeAllowed(key, value) {
  isEncodeAllowed() {
    return true;
  }
}
