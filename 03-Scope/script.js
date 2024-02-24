'use strict';

// **Scope
// function calcAge(birthYear) {
//   const age = 2024 - birthYear;

//   function printAge() {
//     let output = `${firstName} is ${age} years old, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millennial = true;
//     //   const firstName = 'Steven';
//       const str = `${firstName} is a millennial`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }

//       output = 'REDEFINED OUTP';
//     }
//     console.log(millennial);
//     console.log(output);
//   }
//   //   add(3, 5);
//   printAge();
//   return age;
// }

// const firstName = 'Dan';
// calcAge(1985);
// // printAge();

// **Hoisting

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Name';
let job = 'Job';
const year = 2024;

// console.log(addDecl(2, 3));
// console.log(addExp(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExp = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example

if (!numProducts) {
  deleteShoppingCart();
  console.log(Boolean(numProducts));
}

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

var x = 1;
let y = 2;
const z = 3;