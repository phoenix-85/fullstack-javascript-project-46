const indentSize = 4;
const shift = 2;

const getIndent = (depth, marker = ' ') =>
  `${' '.repeat(depth * indentSize - shift)}${marker} `;

const stringify = (value, depth) => {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return [
    '{',
    ...lines,
    `${' '.repeat(depth * indentSize)}}`,
  ].join('\n');
};

export default (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${getIndent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`;

        case 'removed':
          return `${getIndent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`;

        case 'unchanged':
          return `${getIndent(depth)}${node.key}: ${stringify(node.value, depth)}`;

        case 'changed':
          return [
            `${getIndent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth)}`,
            `${getIndent(depth, '+')}${node.key}: ${stringify(node.newValue, depth)}`,
          ];

        case 'nested':
          return [
            `${getIndent(depth)}${node.key}: {`,
            iter(node.children, depth + 1),
            `${' '.repeat(depth * indentSize)}}`,
          ];

        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};