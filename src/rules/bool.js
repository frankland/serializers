import BaseRule from '../base-rule';

export class BoolRule extends BaseRule {
  //getValidator() {
  //  return PropTypes.bool;
  //}

  encode(value) {
    return !!value ? '1' : '0';
  }

  decode(raw) {
    return raw !== '0';
  }

  isValid() {

  }

  isEmpty() {
    return false;
  }
}
