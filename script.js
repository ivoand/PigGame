'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;

const init = function() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

}

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling dice functionality

btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1. generating a random dice rool
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice.
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3.Check for rolled 1: if true, swich to next player.
        if (dice !== 1) {
            // add dice to current score
            currentScore = currentScore + dice; // currentScore += dice;

            // current0El.textContent = currentScore; // change later
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // swich to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        //1. Add current scorre to active player
        scores[activePlayer] += currentScore; // scores[activePlayer] = scores[activePlayer] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        currentScore = 0;
        //2. Check if players score is >=100
        if (scores[activePlayer] >= 20) {
            playing = false; //Finish game
            diceEL.classList.add('hidden'); //Finish game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        //swich the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', init);