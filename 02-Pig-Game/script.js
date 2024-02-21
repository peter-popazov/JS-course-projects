'use strict';

const WIN_SCORE = 20;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const holdEl = document.querySelector('.btn--hold');
const newGameEl = document.querySelector('.btn--new');
const rollButtonEl = document.querySelector('.btn--roll');

let scores = [],
  currentScore,
  activePlayer,
  gamePlaying;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add('hidden');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

rollButtonEl.addEventListener('click', function () {
  if (gamePlaying) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdEl.addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= WIN_SCORE) {
      gamePlaying = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameEl.addEventListener('click', function () {
  init();
});

// Modal
const closeModalEl = document.querySelector('.close-modal');
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const buttonFormEl = document.querySelector('.btn-form');
const inputName0 = document.querySelector('.player-0');
const inputName1 = document.querySelector('.player-1');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');

closeModalEl.addEventListener('click', function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
});

buttonFormEl.addEventListener('click', function () {
  playerName0.innerHTML = inputName0.value;
  playerName1.innerHTML = inputName1.value;
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
});
