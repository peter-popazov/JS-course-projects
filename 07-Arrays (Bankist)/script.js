'use strict';

////** BANKIST APP **////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

let currentAcc;
function updateUI(acc) {
  displayMovements(acc);
  calcBalance(acc);
  calcDisplaySummary(acc);
}

const getUsernames = function (accs) {
  accs.forEach(acc => {
    const [fistName, lastName] = acc.owner.split(' ');
    acc.username =
      fistName.toLowerCase().charAt(0) + lastName.toLowerCase().charAt(0);
  });
};
getUsernames(accounts);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.textContent = '';
    inputLoginPin.blur();
    inputLoginUsername.textContent = '';
    labelWelcome.textContent = `Welcome ${currentAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentAcc);
  }
});

const displayMovements = function ({ movements }, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => (acc += cur), 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});

const calcDisplaySummary = function ({ movements, interestRate }) {
  const deposits = movements.filter(mov => mov > 0);
  const inc = deposits.reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${inc} EUR`;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;

  const interestSum = deposits
    .map(deposit => (deposit * interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interestSum} EUR`;
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const accTo = accounts.find(acc => acc.username === inputTransferTo.value);
  if (accTo === 'undefined') return;
  if (accTo === currentAcc) return;

  if (amount > 0 && currentAcc.balance >= amount) {
    currentAcc.movements.push(-amount);
    accTo.movements.push(amount);
    updateUI(currentAcc);
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const inputPin = Number(inputClosePin.value);
  const inputUsername = inputCloseUsername.value;

  if (currentAcc.username === inputUsername && currentAcc.pin === inputPin) {
    const index = accounts.findIndex(
      acc => acc.username === currentAcc.username
    );
    if (index === -1) return;
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !isSorted);
  isSorted = !isSorted;
});

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const challenge4 = function (dogs) {
  dogs.forEach(dog => {
    dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28);
  });

  const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
  console.log(
    `Sarahs dog is eating ${
      sarahsDog.curFood < sarahsDog.recommendedFood ? 'less' : 'more'
    } than it is supposed to`
  );

  const eatTooMuch = dog => dog.curFood > dog.recommendedFood;

  const ownersEatTooMuch = dogs.filter(eatTooMuch).flatMap(dog => dog.owners);
  const ownersEatTooLittle = dogs
    .filter(dog => !eatTooMuch(dog))
    .flatMap(dog => dog.owners);

  console.log(`${ownersEatTooMuch.join(' and ')}s dog is eating too much`);

  console.log(
    `${ownersEatTooLittle.join(' and ')}s dog is eating too little`
  );

  console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

  const eatOkAmountOfFood = dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1;
  console.log(dogs.some(eatOkAmountOfFood));

  const ok = dogs.filter(eatOkAmountOfFood);
  console.log(ok);

  const sorted = dogs
    .slice()
    .sort((a, b) => a.recommendedFood - b.recommendedFood);
  console.log(sorted);
};

challenge4(dogs);
