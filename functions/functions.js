
/**
* InitGame - Creates an array with all the possible values of cards
* and calls InitCard() with a random element from the array
* which it upon the call removes from the array.
* @return {none}
*/
function InitGame(){
  cards = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
  for (var i = 0; i < 16; i++) {
    InitCard(cards.splice(Math.floor(Math.random()*cards.length), 1));
  }
}

/**
* InitCard - Creates and sets attributes for a div element called "card".
* The card element is then appended as a child to the frame element.
* @param  {int} randomCard - Data-card type generated in InitGame().
* @return {none}
*/
function InitCard(randomCard){
  card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-card", randomCard);
  card.setAttribute("data-active", 0);
  AddListener(card);
  document.querySelector(".frame").append(card);
}

/**
* AddListener - Adds an eventlistener to the card element.
* @param  {node} card - Div element generated in InitCard().
* @return {none}
*/
function AddListener(card){
  card.addEventListener('click', ShowCard);
}

/**
* ReplayBtn - Adds an eventlistener to the element with class button which
* calls InitNewGame().
* @return {none}
*/
function ReplayBtn(){
  document.querySelector(".button").addEventListener('click', InitNewGame);
}

/**
* InitNewGame - Removes current game board and calls InitGame().
* @return {func} - Function for initializing a new game.
*/
function InitNewGame(){
  frame = document.querySelector(".frame");
  while (frame.firstChild) {
    frame.removeChild(frame.firstChild);
  }
  return InitGame();
}

function ShowCard(){
  console.log("Card: " + this.getAttribute('data-card'));        //test
  SetColor(this);
  console.log("Is active:" + this.getAttribute('data-active'));      //test
}

function SetColor(card){
  switch (card.getAttribute('data-card')) {
    case "0":
      card.style.backgroundColor = "red";
      card.setAttribute('data-active', '1');
    break;
    case "1":
      card.style.backgroundColor = "orange";
      card.setAttribute('data-active', '1');
    break;
    case "2":
      card.style.backgroundColor = "brown";
      card.setAttribute('data-active', '1');
    break;
    case "3":
      card.style.backgroundColor = "purple";
      card.setAttribute('data-active', '1');
    break;
    case "4":
      card.style.backgroundColor = "pink";
      card.setAttribute('data-active', '1');
    break;
    case "5":
      card.style.backgroundColor = "blue";
      card.setAttribute('data-active', '1');
    break;
    case "6":
      card.style.backgroundColor = "yellow";
      card.setAttribute('data-active', '1');
    break;
    case "7":
      card.style.backgroundColor = "green";
      card.setAttribute('data-active', '1');
    break;

    default:
      console.log("SetColor function does not work");
  }
}
