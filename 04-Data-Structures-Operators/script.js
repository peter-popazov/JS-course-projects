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
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ time = '20.00', address, mainIndex = 1, starterIndex = 1 }) {
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

  orderPasta(...ings) {
    console.log('The dish is made of these ingredient:');
    for (const ing of ings) {
      console.log('->' + ing);
    }
  },
  orderPizza(mainIng, ...otherIngs) {
    console.log(mainIng);
    console.log(otherIngs);
  },
};

restaurant.orderPasta('SOUSE', 'MEAT');

// **Strtings
const checkBaggage = function (items) {
  const lowered = items.toLowerCase();
  if (
    lowered.includes('knife') ||
    lowered.includes('powerbank') ||
    lowered.includes('scissors')
  ) {
    console.log('NOT ALLOWED');
    return;
  }
  console.log('WELCOME');
};

checkBaggage('Laptop, charger, powerbank, water');
checkBaggage('Knife, charger, phone, food');
checkBaggage('Scissors, tablet, Bottle of water, pillow');
checkBaggage('Food, tablet, Bottle of water, pillow');

// **Maps
const rest = new Map();
rest.set('name', 'Italiano');
rest.set(1, 'Rome, Italy');
rest.set(2, 'Lisbon, Portugal');
console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', '11')
  .set('close', '23')
  .set(true, 'We are open!')
  .set(false, 'We are closed');
console.log(rest);

console.log(rest.get('categories'));

// **Sets
const orderSet = new Set(['Pasta', 'Pizza', 'Rizotto', 'Sushi', 'Pasta']);
console.log(orderSet);

console.log(orderSet.size);

console.log(orderSet.has('Bread'));
orderSet.add('Bread');
console.log(orderSet);
console.log(orderSet.has('Bread'));

orderSet.delete('Rizotto');
orderSet.delete('Meat Rizotto');
console.log(orderSet);

// orderSet.clear();
// console.log(orderSet);

for (const order of orderSet) {
  console.log(order);
}

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Waiter', 'Chef'];
console.log('Positions in the restaurant:');
const positions = [...new Set(staff)];
for (const position of positions) {
  console.log(position);
}

// **Looping over objects
const keys = Object.keys(restaurant.openingHours);
console.log(keys);

const values = Object.values(restaurant.openingHours);
console.log(values);

const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`We are open on ${day} from ${open} to ${close}.`);
}

// **Optional chaining
// console.log(restaurant.openingHours.mon.open); // error
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant?.openingHours?.mon?.open);

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of weekdays) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are ${open}`);
}

console.log(restaurant?.order?.(0, 1) ?? 'Not exist');
console.log(restaurant?.orderRice?.(0, 1) ?? 'Not exist');

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

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

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
