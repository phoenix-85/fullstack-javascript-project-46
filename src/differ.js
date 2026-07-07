import _ from 'lodash';
import parser from './parsers.js'
import formatter from './formatters.js'

export default (fullPath1, fullPath2, format) => {
  const obj1 = parser(fullPath1);
  const obj2 = parser(fullPath2);
  const diff = makeDiff(obj1, obj2);
  console.log(formatter(diff, format));
  // console.log(diff);
}

const isObject = (value) => _.isPlainObject(value);

const makeDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);

    if (!hasKey1) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }

    if (!hasKey2) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: makeDiff(value1, value2),
      };
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      };
    }

    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
};
