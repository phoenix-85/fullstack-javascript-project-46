import formatJSON from './json.js';
import formatPlain from './plain.js'
import formatStylish from './stylish.js';
export default (diff, format) => {
  switch (format) {
    case 'json':
      return formatJSON(diff);
    case 'plain':
      return formatPlain(diff);
    default:
      return formatStylish(diff);
  }
}