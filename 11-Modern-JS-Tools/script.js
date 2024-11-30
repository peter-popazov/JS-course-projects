import { a1 as number1, number2, addToCart } from './shoppingCart.js';
// namespace for every export from module
import * as ShoppingCart from './shoppingCart.js';

console.log('Importing Module');

addToCart('Phone', 1);
console.log(number1, number2);
console.log(ShoppingCart);

// Top Level await in modules [blocks executon of the rest of the module]
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await res.json();
// console.log(data);

const getLatPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { t: data[data.length - 1].body };
};
// const lastPost = await getLatPost();
// console.log(lastPost);

if (module.hot) {
  module.hot.accept();
}
