import formatPlain from './plain.js'
import formatStylish from './stylish.js';
export default (diff, format) => {
  switch (format) {
    case 'plain':
      return formatPlain(diff);
    default:
      return formatStylish(diff);
  }
}