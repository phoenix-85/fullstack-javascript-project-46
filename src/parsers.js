import { load } from 'js-yaml'
import { readFileSync } from 'node:fs';
import path from 'node:path';

export default (fullPath) => {
  const extname = path.extname(fullPath);
  const data = readFileSync(fullPath, 'utf-8');
  switch(extname) {
    case '.yml':
    case '.yaml':
      return load(data);
    default:
      return JSON.parse(data);
  }
}