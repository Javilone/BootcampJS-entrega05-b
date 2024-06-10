import "./style.css";

// ELEMENTOS DEL DOM
const score = document.getElementById("score");
const giveCardBtn = document.getElementById("play-btn");
const giveUpBtn = document.getElementById("give-up-btn");
const restartGameBtn = document.getElementById("restart-btn");

// VARIABLES DE ALMACENAMIENTO
let totalPoints: number = 0;

// FUNCIONES

/* Muestra la puntuación del jugador */
const scoreDisplay = () : void => {
  if (score instanceof HTMLHeadingElement
    && score !== null && score !== undefined) {
    score.innerHTML = totalPoints.toString();
  }
}

/* Genera un número aleatorio */
const getRandomNumber = () : number => {
  return Math.ceil(Math.random() * 10);

}
 /* Obtiene la carta aleatoria (no su valor aun) */
const getCard = (randomNumber: number) : number => { 
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
}

/* Listado de las cartas de juego */
const cardList = (card : number) => {
  let cardUrl = "";
  switch (card) {
      case 1:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
        break;
      case 2:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
        break;
      case 3:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
        break;
      case 4:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
        break;
      case 5:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
        break;
      case 6:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
        break;
      case 7:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
        break;
      case 10:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
        break;
      case 11:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
        break;
      case 12:
        cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
        break;
  }
  return cardUrl;
};

/* Genera la carta con su clase. NO la pinta aun */
const createCard = (cardUrl : string) : HTMLImageElement => {
  const playedCard = document.createElement("img");
  if (playedCard instanceof HTMLImageElement 
    && playedCard !== null && playedCard !== undefined){
    playedCard.src = cardUrl;
    playedCard.className = ("played-card");
  }
  return playedCard
}

/* Pinta la carta en el contenedor padre */
const drawCard = (playedCard : HTMLImageElement) : void => {
  const gameBoard = document.getElementById("played-board");
  if (gameBoard instanceof HTMLDivElement
    && gameBoard !== null && gameBoard !== undefined) {
    gameBoard.appendChild(playedCard);
    }
}

/* Determina el valor de la carta */
const getCardValue = (card: number) : number => {
  return card > 7 ? 0.5 : card;
}

/* Obtiene el valor de la carta */
const sumPoints = (cardValue : number) : number => {
  return totalPoints + cardValue;
}

/* Establece el valor de la carta en la variable totalPoints */
const setPoints = (getPoints : number) : void =>  {
  totalPoints = getPoints;
}


/* Determina el estado de la partida según la puntuación */
const gameStatus = () : string => {
  let statusMessage : string = "";

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

/* Actualiza el heading element del html con la puntuación */
const updateScore = (totalPoints : string) : void => {
  if (score instanceof HTMLHeadingElement
    && score !== undefined && score !== null) {
    score.innerHTML = totalPoints.toString();
  }
}

/* Deshabilita el botón de Pedir Carta */
const giveCardButtonOff = () : void => {
  if (giveCardBtn instanceof HTMLButtonElement
    && giveCardBtn !== null && giveCardBtn !== undefined) {
    giveCardBtn.className = "play-btn-off";
    giveCardBtn.disabled = true;
  }  
}

/* Deshabilita el botón de Plantarse */
const giveUpButtonOff = () : void => {
  if (giveUpBtn instanceof HTMLButtonElement
    && giveUpBtn !== null && giveUpBtn !== undefined) {
    giveUpBtn.className = "play-btn-off";
    giveUpBtn.disabled = true;
    }
}

/* Evalúa el mensaje de estado de la partida al momento de plantarse */
const getGiveUpStatus = () : string => {
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
const setGiveUpStatus = (gameStatus : string) : void => {
  const giveUpPanel = document.getElementById("give-up-panel");
  if (giveUpPanel instanceof HTMLDivElement
    && giveUpPanel !== null && giveUpPanel !== undefined) {
    giveUpPanel.className = "give-up-panel-on";
    giveUpPanel.innerHTML = gameStatus;
    oneMoreTimeButton();
  }
}

/* Habilita el botón de "Una más" en el panel emergente tras plantarse */
const oneMoreTimeButton = () : void => {
  const oneMore = document.getElementById("one-more");
  if (oneMore instanceof HTMLButtonElement
    && oneMore !== null && oneMore !== undefined){
    oneMore.addEventListener("click", getOneMoreTime); // Habilita el botón de generar una carta más en el panel emergente de plantarse
  }
}

/* Arranca el proceso de jugar una carta más */
const getOneMoreTime = () : void => {
  const randomNumber : number = getRandomNumber();
  const card : number = getCard(randomNumber);
  const cardUrl: string = cardList(card);
  const cardValue : number = getCardValue(card)
  const playedCard : HTMLImageElement = createCard(cardUrl);
  drawCard(playedCard);

  let gameStatus = `Pues que habrías sacado un ${cardValue}.<br>Y en total tendrías ${totalPoints + cardValue} puntos`;
  setGiveUpStatus(gameStatus);
}

/* Inicia el proceso de plantar la partida */
const giveUp = () : void => {
  const gameStatus : string = getGiveUpStatus() // Obtengo el mensaje de estado de la partida en base a los puntos
  setGiveUpStatus(gameStatus); // Abro panel emergente mostrando el mensaje de estado de la partida
  giveCardButtonOff();
}

/* Arranca el juego */
const playGame = () : void => {
  const randomNumber : number = getRandomNumber(); // Obtengo un número aleatorio
  const card : number = getCard(randomNumber); // Obtengo el número de la carta según el número aleatorio (no su valor) 
  const cardUrl : string  = cardList(card); // Busco la url de la carta
  const playedCard : HTMLImageElement = createCard(cardUrl); // Creo la carta pero no la pinto aun
  drawCard(playedCard); // Pinto la carta en el contenedor padre

  const cardValue : number = getCardValue(card); // Obtengo el valor en puntos de la carta
  const sumScore: number = sumPoints(cardValue); // Obtengo la suma de los puntos totales + lo que vale la carta
  setPoints(sumScore); // Establezco los puntos totales

  const statusMessage : string = gameStatus(); // Verifico el estado del juego obteniendo un mensaje de victoria, gameover o los puntos
  updateScore(statusMessage); // Actualizo la puntuación
}

/* Recarga la página */
const restartGame = () : void => {
  location.reload();
}

// ASIGNACIÓN DE FUNCIONES A LOS ELEMENTOS
if (score instanceof HTMLHeadingElement
  && score !== null && score !== undefined){
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