import BaseRule from './base-rule';

export default class ReactPropsBaseRule extends BaseRule {
  isValid(value) {
    let validator = this.getValidator();
    let error = validator({value}, 'value');

    return !(error instanceof Error);
  }
}
