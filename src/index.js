import ReactPropBoolRule from './react-props-rules/bool';

const _propTypes = Symbol('prop-types');

export default class Rules {
  constructor(PropTypes) {
    this[_propTypes] = PropTypes;

    this.bool = new ReactPropBoolRule(this[_propTypes]);
  }
}

