console.log('Expoting Module');

const shoppingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`Added [${product}] q:${quantity}`);
};

const a1 = 50;
const a2 = 75;
export { a1, a2 as number2 };
