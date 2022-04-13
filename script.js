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

let currentScore, activePlayer, score, playing;

// Game Initializing Condition
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0]; //using array to access score of two players dynamically
  playing = true; //Defines games state

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Game Initialization
init();
// Load when window load
// window.addEventListener('load', init);

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
    console.log('hold', score[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if players score is =>100
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Game Reset
btnNew.addEventListener('click', init);
