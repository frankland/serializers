import BaseRule from '../base-rule';

export class NoopRule extends BaseRule {
  getValidator() {
    return PropTypes.any;
  }

  encode(value) {
    return value;
  }

  decode(raw) {
    return raw;
  }
}
