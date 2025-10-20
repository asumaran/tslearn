export default function getElementsByClassName(
  element: Element,
  classNames: string
): Array<Element> {
  const result = [];

  function traverse(el: Element) {
    if (el !== element) {
      el.classList.contains();
    }
  }

  traverse(element);

  return result;
}

const doc = new DOMParser().parseFromString(
  `<div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>`,
  'text/html'
);

console.log(getElementsByClassName(doc.body, 'foo bar'));
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.
