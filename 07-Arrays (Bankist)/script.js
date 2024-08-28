'use strict';

////** BANKIST APP **////

const MILSECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const LOGOUT_TIME_SEC = 10;
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-08-09T17:01:17.194Z',
    '2024-08-12T23:36:17.929Z',
    '2024-08-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

let currentAcc, timer;

const getUsernames = function (accs) {
  accs.forEach(acc => {
    const [fistName, lastName] = acc.owner.split(' ');
    acc.username =
      fistName.toLowerCase().charAt(0) + lastName.toLowerCase().charAt(0);
  });
};
getUsernames(accounts);

const logOut = function (intervalName) {
  clearInterval(intervalName);
  labelWelcome.textContent = 'Login to get started';
  containerApp.style.opacity = 0;
  currentAcc = {};
  updateUI(currentAcc);
};

const startLogoutTimer = function () {
  let time = LOGOUT_TIME_SEC;
  const tick = () => {
    const min = ('' + Math.trunc(time / 60)).padStart(2, 0);
    const sec = ('' + Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      logOut(timer);
    }
    time--;
  };

  tick();
  timer = setInterval(tick, 1000);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.textContent = '';
    inputLoginPin.blur();
    inputLoginUsername.textContent = '';
    labelWelcome.textContent = `Welcome ${currentAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    labelDate.textContent = `${new Intl.DateTimeFormat(
      currentAcc.locale,
      dateOptions
    ).format(new Date())}`;

    startLogoutTimer();
    updateUI(currentAcc);
  }
});

const formatCurrency = function (val, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(val);
};

const calcDaysPassed = (d1, d2) =>
  Math.round(Math.abs((d1 - d2) / MILSECONDS_IN_DAY));

const formatMovements = function (date, locale) {
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (
  { movements, movementsDates },
  sort = false
) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const displayDate = formatMovements(
      new Date(movementsDates[i]),
      currentAcc.locale
    );
    const type = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCurrency(
            mov.toFixed(2),
            currentAcc.locale,
            currentAcc.currency
          )}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => (acc += cur), 0);
  labelBalance.textContent = formatCurrency(acc.balance, 'EUR', 'EUR');
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      currentAcc.movements.push(amount);
      currentAcc.movementsDates.push(new Date().toISOString());
      updateUI(currentAcc);
    }, 2500);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogoutTimer();
});

const calcDisplaySummary = function ({ movements, interestRate }) {
  const deposits = movements.filter(mov => mov > 0);
  const inc = deposits.reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${Math.round(inc)} EUR`;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(Math.round(out))} EUR`;

  const interestSum = Math.round(
    deposits
      .map(deposit => (deposit * interestRate) / 100)
      .filter(interest => interest > 1)
      .reduce((acc, mov) => acc + mov)
  );
  labelSumInterest.textContent = formatCurrency(
    interestSum,
    currentAcc.locale,
    currentAcc.currency
  );
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
    const date = new Date().toISOString();
    currentAcc.movementsDates.push(date);
    accTo.movementsDates.push(date);
    updateUI(currentAcc);
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  clearInterval(timer);
  timer = startLogoutTimer();
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

function updateUI(acc) {
  displayMovements(acc);
  calcBalance(acc);
  calcDisplaySummary(acc);
}
