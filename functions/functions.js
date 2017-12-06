"use strict"
//Initierar spelet
function InitGame(){
  const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  for (var i = 0; i < 16; i++) {
    InitCard(cards.splice(Math.floor(Math.random()*cards.length), 1));
  }
  document.querySelector(".button").addEventListener("click", InitNewGame);
}
//Initierar varje kort
function InitCard(randomCard){
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.dataset.card = randomCard;
  card.dataset.active = 0;
  card.dataset.flipped = 0;
  card.addEventListener("click", HandleCard);
  document.querySelector(".frame").append(card);
}
// //Initierar ett nytt spel via en en knapp
// function ReplayBtn(){
//   document.querySelector(".button").addEventListener("click", InitNewGame);
// }
//Tar bort föregående bräde och startar ett nytt spel
function InitNewGame(){
  const frame = document.querySelector(".frame");
  while (frame.firstChild) {
    frame.removeChild(frame.firstChild);
  }
  return InitGame();
}
//Hanterar vad som händer när man klickar på ett kort
function HandleCard(){
  if (IsNotPair()) {
    UnflipCards();
  }
  FlipCard(this);
}

//kollar om det är ett par bland de flippade korten
function IsNotPair(){
  const frame = document.querySelector(".frame").childNodes;
  var temp = [];
  for (var i = 0; i < frame.length; i++) {
    if (frame[i].dataset.flipped === "1") {
      temp.push(frame[i]);
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
  const frame = document.querySelector(".frame").childNodes;
  for (var i = 0; i < frame.length; i++) {
    if (frame[i].getAttribute("data-active") === "0") {
      return false;
    }
  }
  return true;
}

//Flippar tillbaka alla flippade kort på brädet
function UnflipCards(){
  const cards = document.querySelector(".frame").childNodes;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].dataset.flipped === "1") {
      cards[i].dataset.active = 0;
      cards[i].dataset.flipped = 0;
    }
  }
}
