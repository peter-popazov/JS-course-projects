'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    time = '20.00',
    address,
    mainIndex = 1,
    starterIndex = 1,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} delevered to ${address}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `The dish is made of these ingredients ${ing1}, ${ing2}, ${ing3}`
    );
  },
  orderPizza: function (mainIng, ...otherIngs) {
    console.log(mainIng);
    console.log(otherIngs);
  },
};

// **Logical assignment operators
console.log('LOGICAL ASSIGMENT OPERATORS');
const rest1 = {
  name: 'Capri',
  numGuests: 10,
};

const rest2 = {
  name: 'Capri',
  owner: 'Name Surname',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

// **Rest pattern&parameters
console.log('REST PATTERN&PARAMETERS');
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherfood);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(`The result is ${sum}`);
};
add(2, 3);
add(2, 3, 5, 10);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('Cheese', 'Meat', 'Tomato');

// **Spread operator
console.log('SPREAD OPERATOR');
const array = [7, 8, 9];
const expandedArray = [1, 2, ...array];
console.log(expandedArray);
console.log(...expandedArray);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(...newMenu);

// Coppy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Merge 2 arrays
const mergedArray = [...newMenu, ...mainMenuCopy];
console.log(mergedArray);

// ['S', 't', 'r', 'i', 'n', 'g', ' ', 'e', 'x', 'a', 'm', 'p', 'l', 'e']
let str = 'String example';
str = [...str];
console.log(str);

// Function that accepts multiple arguments
// const ingredients = [
//   prompt('Enter ingredient1: '),
//   prompt('Enter ingredient2: '),
//   prompt('Enter ingredient3: '),
// ];
// restaurant.orderPasta(...ingredients);

// Spread operator with objects
const newRestaurant = {
  ...restaurant,
  founder: 'Someone someone',
  foundYear: 1989,
};
console.log(newRestaurant);

// Copy object
const restaurantCopy = { ...restaurant };
restaurantCopy.founder = 'Name Surname';
console.log(restaurantCopy);

// ** Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Renaming the variables
const { name: restaurantName, openingHours: hours } = restaurant;
console.log(restaurantName, hours);

// Giving initial values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Swap
let g = 111;
let h = 999;
const obj = { g: 23, h: 7, j: 14 };
({ g, h } = obj);
console.log(g, h);

// Nested Objects
const {
  fri: { open: fridayOpen, close: fridayClose },
} = openingHours;
console.log(fridayOpen);
console.log(fridayClose);

// Passing an object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 1,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
});

// ** Destructuring Arrays
const arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
const [a, b, c] = arr;
console.log(a, b, c);

let [main, secondary] = restaurant.categories;

// Swapping the categories
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Taking multiple return
const [starterItem, mainItem] = restaurant.order(2, 0);
console.log(starterItem);
console.log(mainItem);

// Nested Destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Giving initial values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
