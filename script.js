'use strict';

// Selecting Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

// Starting conditions

let scores, currentScore, activePlayer, playingGame;

const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingGame = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

init();
const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling Dice functionality
rollDiceBtn.addEventListener('click', function() {
  if (playingGame) {
    // Generated random number between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Displaying the dice based on the number generated.
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // Add dice value to current score if dice value is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    //Switch to the next player
    else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function() {
  if (playingGame) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playingGame = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .getElementById(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
