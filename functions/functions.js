

// function RandomCard(){
//   const card = document.createElement("div");
//   const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//
//   card.setAttribute("class", "card");
//   card.setAttribute("data-card", "2")
//   document.querySelector(".frame").append(card);
// }

function RandomCard(){

  const cards = [0,0,1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
  for (var i = 0; i < 16; i++) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    randomCard = cards.splice(Math.floor(Math.random()*cards.length),1);
    card.setAttribute("data-card", randomCard);
    document.querySelector(".frame").append(card);
  }

}



// function RandomCard(){
//
//   for (var i = 1; i <= 16; i++) {
//     const card = document.createElement("div");
//     card.setAttribute("class", "card");
//     card.setAttribute("data-card", i%7);
//     document.querySelector(".frame").append(card);
//   }
//
// }

RandomCard();
