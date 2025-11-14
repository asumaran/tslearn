type Element = { tag: string; children: Array<string | Element> };

export default function serializeHTML(element: Element): string {
  function iterate(element: any, level: number): string {
    const indent = '\t'.repeat(level);
    const result = [];
    if (typeof element === 'object') {
      const { tag, children } = element;
      result.push(`${indent}<${tag}>`);
      if (children) {
        level++;
        result.push(
          children.map((child) => iterate(child, level).join('\n')).join('\n')
        );
      }
      result.push(`${indent}</${tag}>`);
    } else {
      result.push(`${indent}${element}`);
    }
    return result;
  }

  return iterate(element, 0).join('\n');
}

const tree = {
  tag: 'body',
  children: [
    { tag: 'div', children: [{ tag: 'span', children: ['foo', 'bar'] }] },
    { tag: 'div', children: ['baz'] },
  ],
};

console.log(JSON.stringify(serializeHTML(tree)));
// <body>\n\t<div>\n\t\t<span>\n\t\t\tfoo\n\t\t\tbar\n\t\t</span>\n\t</div>\n\t<div>\n\t\tbaz\n\t</div>\n</body>
// Output:
`<body>
  <div>
    <span>
      foo
      bar
    </span>
  </div>
  <div>
    baz
  </div>
</body>`;
