import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

const gameContainer = document.querySelector(".game-container");
const moves = document.querySelector(".moves");
const guessed = document.querySelector(".guessed");

let movesCount = 0;
let guessedCount = 0;
let firstBottle = null;
const imgUrls = [
  "bottle-1.png",
  "bottle-2.png",
  "bottle-3.png",
  "bottle-4.png",
  "bottle-5.png",
  "bottle-6.png",
];
let correctPosition = shuffle(imgUrls);
console.log(correctPosition);

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateBottles() {
  let colors = shuffle(imgUrls);
  let attempts = 0;

  while (attempts < 100) {
    let hasMatchingPosition = false;

    for (let i = 0; i < colors.length; i++) {
      if (colors[i] === correctPosition[i]) {
        hasMatchingPosition = true;
        break;
      }
    }
    if (!hasMatchingPosition) {
      break;
    }

    colors = shuffle(imgUrls);
    attempts++;
  }

  for (let i = 0; i < 6; i++) {
    const bottleImg = document.createElement("img");

    bottleImg.src = `bottles/${colors[i]}`;
    bottleImg.alt = `bottles/${colors[i]}`;
    bottleImg.classList.add("bottle");

    bottleImg.addEventListener("click", () => {
      handleBottleClick(bottleImg);
    });

    gameContainer.append(bottleImg);
  }
}
generateBottles();

function handleBottleClick(clickedBottle) {
  if (!firstBottle) {
    firstBottle = clickedBottle;
    firstBottle.classList.add("selected");
  } else {
    swapNodes(firstBottle, clickedBottle);
    firstBottle.classList.remove("selected");
    firstBottle = null;
    positionChecking();
  }
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode;
  var p2 = n2.parentNode;
  var i1, i2;

  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

  for (var i = 0; i < p1.children.length; i++) {
    if (p1.children[i].isEqualNode(n1)) {
      i1 = i;
    }
  }
  for (var i = 0; i < p2.children.length; i++) {
    if (p2.children[i].isEqualNode(n2)) {
      i2 = i;
    }
  }

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

function positionChecking() {
  guessedCount = 0;

  const bottles = [...gameContainer.querySelectorAll(".bottle")];
  const currentOrder = bottles.map((bottle) => bottle.src.split("/").pop());

  for (let i = 0; i < correctPosition.length; i++) {
    if (currentOrder[i] === correctPosition[i]) {
      guessedCount++;
    }
  }

  movesCount++;
  moves.textContent = movesCount;
  guessed.textContent = guessedCount;

  setTimeout(() => {
    if (guessedCount === correctPosition.length) {
      jsConfetti.addConfetti({
        confettiColors: [
          "#a587ca",
          "#36cedc",
          "#8fe968",
          "#ffea56",
          "#ffb750",
          "#fe797b",
        ],
      });
    }
  }, 200);
}
