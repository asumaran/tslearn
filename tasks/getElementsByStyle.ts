// este archivo tiene que correr en el browser.
// solo lo pongo aqui como referencia.

export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string
): Array<Element> {
  let result: Element[] = [];

  function traverse(el: Element) {
    // Evitar incluir el nodo raíz en los resultados,
    // ya que la función debe retornar únicamente sus
    // descendientes que cumplen con el estilo especificado.
    if (el !== element) {
      const computedStyles = getComputedStyle(el);
      if (computedStyles.getPropertyValue(property) === value) {
        result.push(el);
      }
    }

    for (let i = 0; i < el.children.length; i++) {
      traverse(el.children[i]);
    }
  }

  traverse(element);

  return result;
}

const doc = new DOMParser().parseFromString(
  `<div>
    <span style="font-size: 12px">Span</span>
    <p style="font-size: 12px">Paragraph</p>
    <blockquote style="font-size: 14px">Blockquote</blockquote>
  </div>`,
  'text/html'
);

getElementsByStyle(doc.body, 'font-size', '12px');
// [span, p] <-- This is an array of elements.
