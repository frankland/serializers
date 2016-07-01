import { PropTypes } from 'react';


class BaseRule {
  constructor(options) {
    this.options = options;
  }

  isValid(value) {
    let validator = this.getValidator();
    let error = validator({value}, 'value');

    return !(error instanceof Error);
  }

  isEmpty(value) {
    return value === undefined || value === null;
  }
}

// -- bool
export class BoolRule extends BaseRule {
  getValidator() {
    return PropTypes.bool;
  }

  encode(value) {
    return !!value ? '1' : '0';
  }

  decode(raw) {
    return raw !== '0';
  }

  isEmpty() {
    return false;
  }
}

// -- numbers
export class NumberRule extends BaseRule {
  getValidator() {
    return PropTypes.number;
  }

  encode(value) {
    let encoded = parseFloat(value).toString(10);
    return encoded === 'NaN' ? null : encoded;
  }

  decode(raw) {
    return raw === null ? null : parseFloat(raw);
  }
}

export class ArrayOfNumbersRule extends NumberRule {
  getValidator() {
    return PropTypes.arrayOf(PropTypes.number);
  }

  encode(value) {
    let listDelimiter = this.options.listDelimiter;
    return !Array.isArray(value) ? null : value.map(super.encode).join(listDelimiter);
  }

  decode(raw) {
    let listDelimiter = this.options.listDelimiter;

    return !raw || !raw.length ? null : raw.split(listDelimiter).map(super.decode);
  }

  isEmpty(value) {
    return !value || !value.length;
  }
}

// -- strings
export class StringRule extends BaseRule {
  getValidator() {
    return PropTypes.string;
  }

  encode(value) {
    return value === null || value === undefined ? null : '' + value;
  }

  decode(raw) {
    return raw === null ? null : '' + raw;
  }

  isEmpty(value) {
    return !value || !value.length;
  }
}

export class ArrayOfStringsRule extends StringRule {
  getValidator() {
    return PropTypes.arrayOf(PropTypes.string);
  }

  encode(value) {
    let listDelimiter = this.options.listDelimiter;
    return !Array.isArray(value) ? null : value.map(super.encode).join(listDelimiter);
  }

  decode(raw) {
    let listDelimiter = this.options.listDelimiter;

    return !raw || !raw.length ? null : raw.split(listDelimiter).map(super.decode);
  }

  isEmpty(value) {
    return !value || !value.length;
  }
}

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

