export default function arrayRule(options = {}) => {
  return {
    encode: (value) => {
      return !!value ? '1' : '0';

    },
    decode: (raw) => {
      return raw !== '0';
    }
  }
}
