import RenameSerializer from './rename-serializer';

const _lastEncoded = Symbol('last-encoded');
const _lastEncodeParams = Symbol('last-encoded');

const _lastDecoded = Symbol('last-decoded');
const _lastDecodeParams = Symbol('last-decoded');

export default class CacheSerializer extends RenameSerializer {
  constructor(struct, options) {
    super(struct, options);

    this[_lastEncoded] = null;
    this[_lastEncodeParams] = null;

    this[_lastDecoded] = null;
    this[_lastDecodeParams] = null;
  }

  getLastEncoded() {
    return this[_lastEncoded] ? {...this[_lastEncoded]} : null;
  }

  getLastEncodeParams() {
    return this[_lastEncodeParams] ? {...this[_lastEncodeParams]} : null;
  }

  getLastDecoded() {
    return this[_lastDecoded] ? {...this[_lastDecoded]} : null;
  }

  getLastDecodeParams() {
    return this[_lastDecodeParams] ? {...this[_lastDecodeParams]} : null;
  }

  // ---

  encode(params) {
    this[_lastEncodeParams] = params;

    let encoded = super.encode(params);

    this[_lastEncoded] = encoded;

    return encoded;
  }

  decode(params, defaults) {
    this[_lastDecodeParams] = params;

    let decoded = super.decode(params, defaults);

    this[_lastDecoded] = decoded;

    return decoded;
  }
}
