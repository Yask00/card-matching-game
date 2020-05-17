/*
  Notes:
  Every flip card has data-id:number and data-name:string
  data-id is to compare two cards and remove their flip listeners
  data-name is different for every two card pairs, so if one is 
  ...opened we can check if we are clicking on the same one again
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
      if (
        openedCardOne.getAttribute("data-name") ===
        this.getAttribute("data-name")
      ) {
        return; // return if we click on the same first open card
      } else {
        isUnmatchedCardFlipped = false;
        openedCardTwo = this;

        const cardBox = this.querySelector(".flipcard-inner");
        cardBox.classList.toggle("flipped");

        compareTwoCards(openedCardOne, openedCardTwo);
      }
    } else {
      // flip first card
      isUnmatchedCardFlipped = true;
      openedCardOne = this;

      const cardBox = this.querySelector(".flipcard-inner");
      cardBox.classList.toggle("flipped");
    }
  }
}

const compareTwoCards = (card1, card2) => {
  if (card1.getAttribute("data-id") === card2.getAttribute("data-id")) {
    ++matchedCardsCounter;

    card1.removeEventListener("click", flipListener, false);
    card2.removeEventListener("click", flipListener, false);

    setTimeout(() => {
      endGame();
    }, 1000);
  } else {
    lockBoard = true;
    setTimeout(() => {
      const cardBoxOne = card1.querySelector(".flipcard-inner");
      cardBoxOne.classList.toggle("flipped");

      const cardBoxTwo = card2.querySelector(".flipcard-inner");
      cardBoxTwo.classList.toggle("flipped");
      lockBoard = false;
    }, 2000);
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
  if (matchedCardsCounter === 8) {
    let flippedCards = Array.from(document.querySelectorAll(".flipcard-inner"));
    flippedCards.forEach((card) => {
      card.classList.remove("flipped");
    });
    gameOverlay.classList.toggle("hidden");
  }
};

const startBtn = document.querySelector(".game-overlay .start");
startBtn.addEventListener("click", startGame);
