const isObject = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value);

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (value === null) {
    return 'null';
  }

  return String(value);
};

export default (tree) => {
  const iter = (nodes, path = '') => nodes
    .flatMap((node) => {
      const property = path ? `${path}.${node.key}` : node.key;

      switch (node.type) {
        case 'nested':
          return iter(node.children, property);

        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value)}`;

        case 'removed':
          return `Property '${property}' was removed`;

        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;

        case 'unchanged':
          return [];

        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    })
    .join('\n');

  return iter(tree);
};