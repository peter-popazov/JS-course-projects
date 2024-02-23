'use strict';

function calcAge(birthYear) {
  const age = 2024 - birthYear;

  function printAge() {
    let output = `${firstName} is ${age} years old, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
    //   const firstName = 'Steven';
      const str = `${firstName} is a millennial`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'REDEFINED OUTP';
    }
    console.log(millennial);
    console.log(output);
  }
  //   add(3, 5);
  printAge();
  return age;
}

const firstName = 'Dan';
calcAge(1985);
// printAge();
