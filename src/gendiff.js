import parse from './parsers.js'

export default (fullPath1, fullPath2) => {
  const obj1 = parse(fullPath1);
  const obj2 = parse(fullPath2);
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const diff = [];

  for (const key of keys) {
    if (!(key in obj1)) {
      diff.push(`  + ${key}: ${obj2[key]}`);
    }
    else if (!(key in obj2)) {
      diff.push(`  - ${key}: ${obj1[key]}`);
    }
    else {
      if (obj1[key] === obj2[key]) {
        diff.push(`    ${key}: ${obj2[key]}`);
      }
      else {
        diff.push(`  - ${key}: ${obj1[key]}`);
        diff.push(`  + ${key}: ${obj2[key]}`);
      }
    }
  }

  console.log(['{', ...diff, '}'].join('\n'));
}