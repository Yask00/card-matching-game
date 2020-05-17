/*
  Notes:
  Every flip card has data-id:number
  data-id is to compare two cards and remove their flip listeners
  lockBoard is true while we are checking unmatched cards and wait them to flip again
*/

let flipCards = Array.from(document.querySelectorAll(".flipcard"));
const gameOverlay = document.querySelector(".game-overlay");
let isUnmatchedCardFlipped = false;
let matchedCardsCounter = 0; // ends on 8
let openedCardOne = null;
let openedCardTwo = null;
let lockBoard = false;

function flipListener() {
  if (!lockBoard) {
    if (isUnmatchedCardFlipped) {
      // flip second card
      if (openedCardOne === this) {
        return; // return if we click on the same first open card
      } else {
        isUnmatchedCardFlipped = false;
        openedCardTwo = this;
        flipCard(openedCardTwo);
        compareTwoCards();
      }
    } else {
      // flip first card
      isUnmatchedCardFlipped = true;
      openedCardOne = this;
      flipCard(openedCardOne);
    }
  }
}

const flipCard = (card) => {
  const cardBox = card.querySelector(".flipcard-inner");
  cardBox.classList.toggle("flipped");
};

const compareTwoCards = () => {
  if (
    openedCardOne.getAttribute("data-id") ===
    openedCardTwo.getAttribute("data-id")
  ) {
    ++matchedCardsCounter;

    openedCardOne.removeEventListener("click", flipListener, false);
    openedCardTwo.removeEventListener("click", flipListener, false);

    setTimeout(() => {
      if (matchedCardsCounter === 8) {
        endGame();
      }
    }, 1000);
  } else {
    lockBoard = true;
    setTimeout(() => {
      flipCard(openedCardOne);
      flipCard(openedCardTwo);
      lockBoard = false;
    }, 1000);
  }
};

function shuffleCardsArray() {
  for (let i = flipCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flipCards[i], flipCards[j]] = [flipCards[j], flipCards[i]];
  }
  flipCards.map((card, index) => {
    card.style.order = index; // flex property to mix cards
  });
}

const startGame = () => {
  gameOverlay.classList.toggle("hidden");

  shuffleCardsArray();
  flipCards.forEach(function (card) {
    card.addEventListener("click", flipListener);
  });
};

endGame = () => {
  matchedCardsCounter = 0;
  let flippedCards = Array.from(document.querySelectorAll(".flipcard-inner"));
  flippedCards.forEach((card) => {
    card.classList.remove("flipped");
  });
  gameOverlay.classList.toggle("hidden");
};

const startBtn = document.querySelector(".game-overlay .start");
startBtn.addEventListener("click", startGame);
