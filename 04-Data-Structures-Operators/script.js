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

  orderDelivery: function ({ time = '20.00', address, mainIndex=1, starterIndex=1 }) {
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
};


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
