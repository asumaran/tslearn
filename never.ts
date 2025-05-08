function throwError(message: string): never {
  throw new Error(message);
}

// const x = throwError("goo");

if (typeof x === "string") {
  console.log("es string", x);
} else {
  console.log("que es?", x);
}

// --

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea1(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

const area1 = getArea({ kind: "circle", radius: 2 });

// --

type Shape2 = "circle" | "square" | "triangle";

function getArea2(shape: Shape2): number {
  switch (shape) {
    case "circle":
      return 3.14;
    case "square":
      return 4;
    default:
      const _exhaustiveCheck: never = shape; // si se agrega un nuevo tipo y no se maneja, TypeScript da error
      return _exhaustiveCheck;
  }
}

const area2 = getArea2("triangle");

// En este caso typescript retorna el error `Type '"triangle"' is not assignable to type 'never'.ts(2322)`
// al agregar un literal type adicional al tipo "Shape2". Ya que el switch no está preparado para recibir
// un argumento de tipo "triangle" y terminaría entrando por "default" asignando shape a _exhaustiveCheck
// pero este ya ha sido definido con tipo "never" y "triangle" no es asignable a "never".
// entonces TS retorna el error.
