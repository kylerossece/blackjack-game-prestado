const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const newGameButton = document.getElementById("newGameButton");
const tutorialButton = document.getElementById("tutorialButton");
const closeButton = document.getElementById("closeButton");
const playAgainButton = document.getElementById("playAgainButton");
const faceDownCard = document.getElementById("faceDownCard");
const blogButton = document.getElementById("blogButton");
const tutorialBox = document.querySelector(".tutorialBox");
const cardValues = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
const cardSuits = ["Clovers", "Hearts", "Pikes", "Tiles"];
let h2 = document.getElementsByTagName("h2");
let dealerSum = 0;
let playerSum = 0;
let cardDeck = [];

hideH2();
hideButtons();

tutorialButton.addEventListener("click", () => {
  tutorialBox.showModal();
});

closeButton.addEventListener("click", () => {
  tutorialBox.close();
});

hitButton.addEventListener("click", function () {
  getPlayerCards();
  aceCondition(card);
  showTotal();
  disableHit();
});

standButton.addEventListener("click", function () {
  showStand();
  hitButton.disabled = true;
  getDealerCards();

  if (dealerSum <= 16) {
    getDealerCards();
  }
  aceCondition(card);
  showTotal();
  winCondition();
});

newGameButton.addEventListener("click", function () {
  showNewGame();
  showH2();
  createDeck();
  shuffleDeck();
  getDealerCards();
  getPlayerCards();
  getPlayerCards();
  aceCondition(card);
  showTotal();
  console.log(cardDeck);
});

function hideButtons() {
  faceDownCard.style.display = "none";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  playAgainButton.style.display = "none";
  blogButton.style.display = "inline";
}

function showStand() {
  faceDownCard.style.display = "none";
  playAgainButton.style.display = "inline";
}

function showNewGame() {
  faceDownCard.style.display = "inline";
  hitButton.style.display = "inline";
  standButton.style.display = "inline";
  blogButton.style.display = "none";
  newGameButton.style.display = "none";
}

function hideH2() {
  for (i = 0; i < h2.length; i++) {
    h2[i].style.display = "none";
  }
}
function showH2() {
  for (i = 0; i < h2.length; i++) {
    h2[i].style.display = "block";
  }
}

function playAgain() {
  document.location.href = "p2-js-game.html";
}

function createDeck() {
  for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardSuits.length; j++) {
      cardDeck.push(cardSuits[j] + "_" + cardValues[i] + "_white");
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < cardDeck.length; i++) {
    let j = Math.floor(Math.random() * cardDeck.length);
    let k = cardDeck[i];
    cardDeck[i] = cardDeck[j];
    cardDeck[j] = k;
  }
}

function getCardValue(cardNumber) {
  splitCardText = card.split("_");
  cardNumber = splitCardText[1];

  switch (cardNumber) {
    case "A":
      return 1;
    case "King":
    case "Jack":
    case "Queen":
      return 10;
    default:
      return parseInt(cardNumber);
  }
}
function getDealerCards() {
  card = cardDeck.pop();
  console.log(card);
  cardImage = document.createElement("img");
  cardImage.src = "./deckOfCards/" + card + ".png";
  document.getElementById("dealerCards").append(cardImage);

  dealerSum += getCardValue();
}
function getPlayerCards() {
  card = cardDeck.pop();
  console.log(card);
  cardImage = document.createElement("img");
  cardImage.src = "./deckOfCards/" + card + ".png";
  document.getElementById("playerCards").append(cardImage);

  playerSum += getCardValue();
}

function showTotal() {
  document.getElementById(
    "dealerTotal"
  ).innerText = `Dealer's Total: ${dealerSum}`;
  document.getElementById(
    "playerTotal"
  ).innerText = `Player's Total: ${playerSum}`;
}

function aceCondition(card) {
  let checkAce = false;
  const aceString = "_A_";

  if (card.includes(aceString)) {
    checkAce = true;
  }
  if (checkAce && playerSum + 10 <= 21) {
    playerSum += 10;
  } else if (checkAce && dealerSum + 10 <= 21) {
    dealerSum += 10;
  }
}

function winCondition() {
  let gameResult = "";

  if (dealerSum > 21) {
    gameResult = "The Player Wins";
  } else if (playerSum > 21) {
    gameResult = "The Dealer Wins";
  } else if (playerSum == dealerSum) {
    gameResult = "Tie";
  } else if (playerSum > dealerSum) {
    gameResult = "The Player Wins";
  } else if (playerSum < dealerSum) {
    gameResult = "The Dealer Wins";
  }
  document.getElementById("Result").innerText = gameResult;
}

function disableHit() {
  if (playerSum >= 21) {
    hitButton.disabled = true;
  }
}

function disableStand() {
  standButton.disabled = true;
}
