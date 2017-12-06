"use strict"
/**
* InitGame - Creates an array with all the possible values of cards
* and calls InitCard() with a random element from the array
* which it upon the call removes from the array.
* @return {none}
*/
function InitGame(){
  const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
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
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-card", randomCard);
  card.setAttribute("data-active", "0");
  card.setAttribute("data-flipped", "0");
  AddListener(card);
  document.querySelector(".frame").append(card);
}

/**
* AddListener - Adds an eventlistener to the card element.
* @param  {node} card - Div element generated in InitCard().
* @return {none}
*/
function AddListener(card){
  card.addEventListener('click', HandleCard);
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
  const frame = document.querySelector(".frame");
  while (frame.firstChild) {
    frame.removeChild(frame.firstChild);
  }
  return InitGame();
}

function HandleCard(){
  SetColor(this);
  this.setAttribute("data-flipped", "1");
  console.log(NumOfCardsFlipped());
}
function SetColor(card){
  card.setAttribute('data-active', '1');
}
function NumOfCardsFlipped(){
  const frame = document.querySelector(".frame").childNodes;
  var counter = 0;
  for (var i = 0; i < frame.length; i++) {
    if (frame[i].dataset.flipped === "1") {
      counter++;
    }
  }
  return counter;
}
function CompareCards(card1, card2){
  return card1.getAttribute('data-card') === card2.getAttribute('data-card');
}

function IsGameDone(){
  const frame = document.querySelector(".frame").childNodes;
  for (var i = 0; i < frame.length; i++) {
    if (frame[i].getAttribute('data-active') === "0") {
      return false;
    }
  }
  return true;
}
