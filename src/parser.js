import _ from 'lodash';

export default (json1, json2) => {
  const data1 = JSON.parse(json1);
  const data2 = JSON.parse(json2);
  const keys = Object.keys({ ...data1, ...data2 }).sort();

  const diff = [];

  for (const key of keys) {
    if (!(key in data1)) {
      diff.push(`  + ${key}: ${data2[key]}`);
    }
    else if (!(key in data2)) {
      diff.push(`  - ${key}: ${data1[key]}`);
    }
    else {
      if (data1[key] === data2[key]) {
        diff.push(`    ${key}: ${data2[key]}`);
      }
      else {
        diff.push(`  - ${key}: ${data1[key]}`);
        diff.push(`  + ${key}: ${data2[key]}`);
      }
    }
  }

  console.log(['{', ...diff, '}'].join('\n'));
}