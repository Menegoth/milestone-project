function startGame() {

    //create player hand array to add cards to
    let playerHand = [];
    playerHand.push(createNewPlayerCard());
    playerHand.push(createNewPlayerCard());
    
    playerTurn();
}

function createNewPlayerCard() {

    let card = new Card();

    const cardDiv = document.createElement("div");
    const cardNumber = document.createElement("h1");
    const cardSuit = document.createElement("p");

    cardDiv.style.width = "120px";
    cardDiv.style.height = "175px";
    cardDiv.style.border = "1px solid black";
    cardDiv.style.display = "inline-block";

    cardSuit.textContent = card.suit;
    cardNumber.textContent = card.number;

    cardDiv.append(cardSuit, cardNumber);

    document.getElementById("player-hand").append(cardDiv);

    return card;

}

function playerTurn() {

    let playing = true;
    while (playing) {

        

    }

}

startGame();