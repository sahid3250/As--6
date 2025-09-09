### 1) What is the difference between var, let, and const?
- `var`: Function-scoped, can be re-declared and updated. Hoisted.
- `let`: Block-scoped, can be updated but not re-declared within the same scope.
- `const`: Block-scoped, cannot be re-assigned.

### 2) What is the difference between map(), forEach(), and filter()?
- `map()`: Returns a new array after applying a function to each element.
- `forEach()`: Iterates over elements but does not return anything.
- `filter()`: Returns a new array with elements that satisfy a condition.

### 3) What are arrow functions in ES6?
Arrow functions provide a shorter syntax for functions and do not bind their own `this`.

### 4) How does destructuring assignment work in ES6?
It allows unpacking values from arrays or objects into distinct variables.
```js
const [a, b] = [1, 2];
const {name, age} = person;
