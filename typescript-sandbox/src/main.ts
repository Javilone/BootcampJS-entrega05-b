import "./style.css";

// VARIABLES DE ALMACENAMIENTO
let totalPoints: number = 0;

// ELEMENTOS DEL DOM
const score = document.getElementById("score");
const giveCardBtn = document.getElementById("give-card-btn");


// FUNCIONES

/* scoreDisplay muestra la puntuación del jugador */
const scoreDisplay = () => {
  if (score !== null && score !== undefined) {
    score.innerHTML = totalPoints.toString();
  }
}

/* Listado de las cartas de juego */
const getACard = (card : number) => {
  let cardUrl = "";
  switch (card) {
      case 1:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
        break;
      case 2:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
        break;
      case 3:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
        break;
      case 4:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
        break;
      case 5:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
        break;
      case 6:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
        break;
      case 7:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
        break;
      case 10:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
        break;
      case 11:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
        break;
      case 12:
        cardUrl =  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
        break;
  }
  return cardUrl;
};

/* getRandomCard obtiene un número aleatorio */
const getRandomNumber = () => {
  return Math.ceil(Math.random() * 10);

}
 /* getRandomCard obtiene la carta */
const getRandomCard = (randomNumber: number) => { 
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
}

/* createCard crea la carta que será pintada en el contenedor padre */
const createCard = (cardUrl : string) => {
  const playedCard = document.createElement("img");
  playedCard.src = cardUrl;
  playedCard.className = ("played-card");
  return playedCard
}

/* drawCard pinta la carta en el contenedor */
const drawCard = (playedCard : HTMLImageElement) => {
  const gameBoard = document.getElementById("played-board");
  if (gameBoard instanceof HTMLDivElement
    && gameBoard !== null && gameBoard !== undefined) {
    gameBoard.appendChild(playedCard);
    }
}

const getCardValue = (randomCard: number) => {
  return randomCard > 7 ? 0.5 : randomCard;
}

const getPoints = (randomCard : number) => {
  const value = getCardValue(randomCard);
  return totalPoints = totalPoints + value;
}



/* playGame inicia el juego */
const playGame = () => {
  const randomNumber : number = getRandomNumber();
  const randomCard : number = getRandomCard(randomNumber);
  const cardUrl : string  = getACard(randomCard);
  
  const playedCard = createCard(cardUrl);
  drawCard(playedCard);

  const getScore = getPoints(randomCard);

  console.log(getScore)
}

// ASIGNACIÓN DE FUNCIONES A LOS ELEMENTOS
if (score instanceof HTMLHeadingElement) {
  document.addEventListener("DOMContentLoaded", () => scoreDisplay());
}

if (giveCardBtn instanceof HTMLButtonElement
  && giveCardBtn !== null && giveCardBtn !== undefined) {
  document.addEventListener("click", playGame)
  }
