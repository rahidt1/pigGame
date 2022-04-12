'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Global Variables
let currentScore = 0;
let activePlayer = 0;
const score = [0, 0]; //using array to access score of two players dynamically
let playing = true; //Defines games state

// Switch Player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    // console.log(dice);

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Funtionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player
    score[activePlayer] += currentScore;
    console.log(currentScore);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if players score is =>100
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
