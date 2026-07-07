import path from 'node:path';
import process from 'node:process';
import differ from './differ.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  return differ(fullPath1, fullPath2, format);
};