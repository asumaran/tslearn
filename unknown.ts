function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b(); //Error: `'a' is of type 'unknown'.ts(18046)`
}

type Param = {
  foo: "string";
  b: () => {};
};

function f3(a: unknown) {
  if (isParam(a)) {
    // aca estamos seguro que `a` es de tipo `Param`
    console.log(a);
  }
}

// el obj is `Type`, indica a TS que el obj ha sido identificado como `Type`
// al retornar true.
// obj puede ser como any para hacer mas rapido la comprobacion pero
// lo recomendable es usar unknown para que se haga la comprobación más meticulosa y por lo tanto mas robusta.
function isParam(obj: unknown): obj is Param {
  // podriamos ser mas especificos en la comprobacion
  return (
    typeof obj === "object" &&
    obj !== null &&
    "foo" in obj &&
    typeof obj.foo === "string"
  );
}

// el tipo `unknown` es similar a `any` pero en el caso de
// `unknown`, no es legal operar con esta variable hasta que por un typeguard
// sea posible identificar el tipo.
