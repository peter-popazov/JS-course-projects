const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (user, limits) => limits[user] || 0;

const addExpenses = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const userName = user.toLowerCase();
  return value <= getLimit(userName, limits)
    ? [...state, { value: -value, description, user: userName }]
    : state;
};

const newBudget1 = addExpenses(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpenses(newBudget1, spendingLimits, 2, 'Bread');
const newBudget3 = addExpenses(newBudget2, spendingLimits, 3, 'Milk');

const checkExpenses = function (state, limits) {
  return state.map(entry =>
    rentry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry
  );
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const output = state
    .filter(entry => entry.value <= -bigLimit)
    .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  console.log(output);
};

logBigExpenses(finalBudget, 500);
