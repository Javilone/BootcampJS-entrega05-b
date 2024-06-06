import "./style.css";

// VARIABLES DE ALMACENAMIENTO
let totalPoints: number = 0;

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

/* getRandomCard genera un número aleatorio */
const getRandomNumber = () => {
  return Math.ceil(Math.random() * 10);

}
 /* getRandomCard obtiene la carta aleatoria */
const getRandomCard = (randomNumber: number) => { 
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
}

/* createCard crea la carta y su clase que será pintada en el contenedor padre */
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

/* Determina el valor de la carta */
const getCardValue = (randomCard: number) => {
  return randomCard > 7 ? 0.5 : randomCard;
}

/* Obtiene el valor de la carta */
const getPoints = (randomCard : number) => {
  const value = getCardValue(randomCard);
  return totalPoints + value;
}

/* Establece el valor de la carta en la variable totalPoints */
const setPoints = (getPoints : number) =>  {
  totalPoints = getPoints;
}

/* Actualiza el heading element del html con la puntuación */
const updateScore = (totalPoints : string)  => {
  if (score !== undefined && score !== null && score instanceof HTMLHeadingElement) {
      score.innerHTML = totalPoints.toString();
  }
}

/* Determina el estado de la partida según la puntuación */
const gameStatus = () => {
  let statusMessage = "";

  if(totalPoints === 7.5) {
    statusMessage = `¡Lo has clavado! ¡Enhorabuena! Has conseguido ${totalPoints} puntos!`;
    giveCardButtonOff();
    giveUpButtonOff();
  } else if (totalPoints > 7.5) {
    statusMessage = `¡Te pasaste! Has obtenido ${totalPoints} puntos.`
    giveCardButtonOff();
    giveUpButtonOff();
  } else {
      statusMessage = totalPoints.toString();
  }
  return statusMessage;
}

/* Deshabilita el botón de Pedir Carta */
const giveCardButtonOff = ()  => {
  if (giveCardBtn !== null && giveCardBtn !== undefined
    && giveCardBtn instanceof HTMLButtonElement) {
      giveCardBtn.className = "play-btn-off";
      giveCardBtn.disabled = true;
  }  
}

/* Deshabilita el botón de Plantarse */
const giveUpButtonOff = () => {
  if (giveUpBtn !== null && giveUpBtn !== undefined
    && giveUpBtn instanceof HTMLButtonElement) {
    giveUpBtn.className = "play-btn-off";
    giveUpBtn.disabled = true;
    }
}

/* Evalúa el mensaje de estado de la partida al momento de plantarse */
const getGiveUpStatus = () => {
  giveUpButtonOff();
  if(totalPoints <= 4) {
      return `Has sido muy conservador. <br><p>Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
  } 
  if(totalPoints >= 4.5 && totalPoints <= 5.5) {
      return `Te ha entrado el canguelo ¿eh? <br><p>Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
  } 
  if(totalPoints >= 6 && totalPoints <= 7) {
      return `Casi casi...<br><p> Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
  } 
  return totalPoints.toString();
}

/* Establece el mensaje de estado tras plantarse */
const setGiveUpStatus = (gameStatus : string) => {
  const giveUpPanel = document.getElementById("give-up-panel");
  if (giveUpPanel instanceof HTMLDivElement
    && giveUpPanel !== null && giveUpPanel !== undefined) {
    giveUpPanel.className = "give-up-panel-on";
    giveUpPanel.innerHTML = gameStatus;
    oneMoreTimeButton();
  }
}

/* Habilita el botón de "Una más" en el panel emergente tras plantarse */
const oneMoreTimeButton = () => {
  const oneMore = document.getElementById("one-more");
  if (oneMore instanceof HTMLButtonElement
    && oneMore !== null && oneMore !== undefined)
  {
    oneMore.addEventListener("click", getOneMoreTime);
  }
}

/* Arranca el proceso de jugar una carta más */
const getOneMoreTime = () => {
  const randomNumber : number = getRandomNumber();
  const randomCard : number = getRandomCard(randomNumber);
  const cardUrl: string = getACard(randomCard);
  const value = getCardValue(randomCard)
  
  const playedCard = createCard(cardUrl);
  drawCard(playedCard);

  let gameStatus = `Pues que habrías sacado un ${value}.<br>Y en total tendrías ${totalPoints + value} puntos`;
  setGiveUpStatus(gameStatus);
}

/* Inicia el proceso de plantar la partida */
const giveUp = ()  => {
  const gameStatus = getGiveUpStatus()
  setGiveUpStatus(gameStatus);
  giveCardButtonOff();
}

/* playGame arranca el juego */
const playGame = () => {
  const randomNumber : number = getRandomNumber();
  const randomCard : number = getRandomCard(randomNumber);
  const cardUrl : string  = getACard(randomCard);
  
  const playedCard = createCard(cardUrl);
  drawCard(playedCard);

  const getScore = getPoints(randomCard);
  setPoints(getScore);

  const statusMessage = gameStatus();
  updateScore(statusMessage);
}

/* Recarga la página */
const restartGame = () => {
  location.reload();
}

// ELEMENTOS DEL DOM
const score = document.getElementById("score");
const giveCardBtn = document.getElementById("play-btn");
const giveUpBtn = document.getElementById("give-up-btn");
const restartGameBtn = document.getElementById("restart-btn");

// ASIGNACIÓN DE FUNCIONES A LOS ELEMENTOS
if(score instanceof HTMLHeadingElement) {
  score.addEventListener("DOMContentLoaded", () => scoreDisplay());
}

if(giveCardBtn instanceof HTMLButtonElement
  && giveCardBtn !== null && giveCardBtn !== undefined) {
  giveCardBtn.addEventListener("click", playGame);
}

if (giveUpBtn instanceof HTMLButtonElement
  && giveUpBtn !== null && giveUpBtn !== undefined) {
  giveUpBtn.addEventListener("click", giveUp);
  }
  
if(restartGameBtn instanceof HTMLButtonElement
  && restartGameBtn !== null && restartGameBtn !== undefined) {
  restartGameBtn.addEventListener("click", restartGame);
  }
