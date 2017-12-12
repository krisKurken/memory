"use strict"

/**
* StartBtn - Handles functionality for the startbutton
* and removes it after its been "clicked".
* @return {none}
*/
function StartBtn(){
  const btn = document.querySelector(".startBtn");
  btn.addEventListener("click", InitGame);
  btn.addEventListener("click", function(){btn.remove();});
}

/**
* InitGame - Initializes the game by calling all necessary
* functions.
* @return {none}
*/
function InitGame(){
  const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  CreateBoard();
  for (var i = 0; i < 16; i++) {
    InitCard(cards.splice(Math.floor(Math.random()*cards.length), 1));
  }
  document.querySelector(".button").addEventListener("click", InitNewGame);
  document.querySelector(".board").dataset.moves = 0;
  ShowGame();
}

/**
* CreateBoard - Creates the board and replay button and
* appends it to the wrapper div.
* @return {none}
*/
function CreateBoard(){
  const wrapper = document.querySelector(".wrapper");
  const board = document.createElement("div");
  const button = document.createElement("div");
  const btnText = document.createElement("p");
  btnText.innerHTML = "REPLAY";
  board.setAttribute("class", "board");
  button.setAttribute("class", "button");
  wrapper.append(board);
  wrapper.append(button);
  button.append(btnText);
}

/**
* ShowGame - Creates the transition effect for the game board
* and the replay button.
* @return {none}
*/
function ShowGame(){
  setTimeout(function(){
    document.querySelector(".board").style.opacity = "1";
    document.querySelector(".button").style.opacity = "0.89";
  }, 100);
}

/**
* InitCard - Initializes every card, appends it to the
* board and adds a click event to it.
* @param  {int} randomCard - Random int that represents the card.
* @return {none}
*/
function InitCard(randomCard){
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.dataset.card = randomCard;
  card.dataset.active = 0;
  card.dataset.flipped = 0;
  card.addEventListener("click", HandleCard);
  document.querySelector(".board").append(card);
}

/**
* InitNewGame - Removes previous game if needed and
*  calls InitGame() to start a new one.
* @return {none}
*/
function InitNewGame(){
  const board = document.querySelector(".board");
  const button = document.querySelector(".button");
  const menu = document.querySelector(".gameDoneMenu")
  if (board != null) {
    board.remove();
  }
  if (menu != null) {
    menu.remove();
  }
  button.remove();
  return InitGame();
}

/**
* HandleCard - Handles click events for all the cards and calls the
* appropriate function. It also adds to the amount of moves variable.
* @return {none}
*/
function HandleCard(){
  const board = document.querySelector(".board");
  board.dataset.moves = parseInt(board.dataset.moves) + 1;
  if (IsPair()) {
    UnflipCards();
  }
  if (IsGameDone()) {
    GameDoneHandler();
  }
  FlipCard(this);
}

/**
* IsPair - Checks if there are two cards "flipped" and if they are
* a pair.
* @return {bool} - False if the cards should be flipped back.
*/
function IsPair(){
  const board = document.querySelector(".board").childNodes;
  var temp = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i].dataset.flipped === "1") {
      temp.push(board[i]);
      if (temp.length >=2 && temp[0].dataset.card === temp[1].dataset.card) {
        HandlePair(temp[0], temp[1]);
        return false;
      }
      else if(temp.length >=2){
        return true;
      }
    }
  }
  return false;
}

/**
* HandlePair - Removes the flipped status and the EventListener
* for the cards sent to the function.
* @param  {html object} card1 - One of the paired cards.
* @param  {html object} card2 - One of the paired cards.
* @return {none}
*/
function HandlePair(card1, card2){
  card1.dataset.flipped = 0;
  card2.dataset.flipped = 0;
  card1.removeEventListener("click", HandleCard);
  card2.removeEventListener("click", HandleCard);
}

/**
* FlipCard - Showes the cards and adds a flipped and active status to them.
* @param  {html object} card - Card that will be "flipped".
* @return {none}
*/
function FlipCard(card){
  card.dataset.active = 1;
  card.dataset.flipped = 1;
}

/**
* IsGameDone - Checks if the card "clicked" is the last
* card in the game.
* @return {bool} - Returns true if there is only one card left.
*/
function IsGameDone(){
  const board = document.querySelector(".board").childNodes;
  var counter = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i].getAttribute("data-active") === "1") {
      counter++;
    }
  }
  if (counter < board.length -1) {
    return false;
  }
  return true;
}

/**
* UnflipCards - Unflippes all the cards in the game with
* flipped status 1.
* @return {none}
*/
function UnflipCards(){
  const cards = document.querySelector(".board").childNodes;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].dataset.flipped === "1") {
      cards[i].dataset.active = 0;
      cards[i].dataset.flipped = 0;
    }
  }
}

/**
* GameDoneHandler - Creates the "gameDoneMenu" and adds it as a
* child element to the wrapper div. The function also removes
* previus board.
* @return {none}
*/
function GameDoneHandler(){
  const gameDoneMenu = document.createElement("div");
  const menuText = document.createElement("p");
  const board = document.querySelector(".board");
  menuText.innerHTML = `You finished in ${board.dataset.moves} moves`;
  gameDoneMenu.setAttribute("class", "gameDoneMenu");
  gameDoneMenu.append(menuText);
  document.querySelector(".wrapper").insertAdjacentElement("afterbegin", gameDoneMenu);
  document.querySelector(".board").remove();
}
