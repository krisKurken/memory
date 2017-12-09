"use strict"

function StartBtn(){
  const btn = document.querySelector(".startBtn");
  btn.addEventListener("click", InitGame);
  btn.addEventListener("click", function(){btn.remove();});
}

//Initierar spelet
function InitGame(){
  const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  for (var i = 0; i < 16; i++) {
    InitCard(cards.splice(Math.floor(Math.random()*cards.length), 1));
  }
  document.querySelector(".button").addEventListener("click", InitNewGame);
  document.querySelector(".board").dataset.moves = 0;
  ShowGame();
}

function ShowGame(){
  setTimeout(function(){
    document.querySelector(".board").style.opacity = "1";
    document.querySelector(".button").style.opacity = "0.89";
  }, 300);
}

//Initierar varje kort
function InitCard(randomCard){
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.dataset.card = randomCard;
  card.dataset.active = 0;
  card.dataset.flipped = 0;
  card.addEventListener("click", HandleCard);
  document.querySelector(".board").append(card);
}

//Tar bort föregående bräde och startar ett nytt spel
function InitNewGame(){
  const board = document.querySelector(".board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  return InitGame();
}
//Hanterar vad som händer när man klickar på ett kort
function HandleCard(){
  const board = document.querySelector(".board");
  if (IsPair()) {
    UnflipCards();
  }
  FlipCard(this);
  board.dataset.moves = parseInt(board.dataset.moves) + 1;
}

//kollar om det är ett par bland de flippade korten
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

function HandlePair(card1, card2){
  card1.dataset.flipped = 0;
  card2.dataset.flipped = 0;
  card1.removeEventListener("click", HandleCard);
  card2.removeEventListener("click", HandleCard);
}

//Visar kortet
function FlipCard(card){
  card.dataset.active = 1;
  card.dataset.flipped = 1;
}

//Kollar om spelet är klart
function IsGameDone(){
  const board = document.querySelector(".board").childNodes;
  for (var i = 0; i < board.length; i++) {
    if (board[i].getAttribute("data-active") === "0") {
      return false;
    }
  }
  return true;
}

//Flippar tillbaka alla flippade kort på brädet
function UnflipCards(){
  const cards = document.querySelector(".board").childNodes;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].dataset.flipped === "1") {
      cards[i].dataset.active = 0;
      cards[i].dataset.flipped = 0;
    }
  }
}
