import formatStylish from './formatters/stylish.js';
export default (diff, format) => {
  switch (format) {
    default:
      return formatStylish(diff);
  }
}