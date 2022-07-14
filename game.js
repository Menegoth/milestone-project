//create player hand array to add cards to
const playerHandDiv = document.getElementById("player-hand");
let playerHand = [];
createNewPlayerCard();
createNewPlayerCard();

//create computer hand 
let computerHand = [];
const computerHandDiv = document.getElementById("computer-hand");

//player logic

const hitButton = document.getElementById("hit");
const stopButton = document.getElementById("stop");

createButtonFunctionalities();

//button functionalities
function createButtonFunctionalities() {
    hitButton.addEventListener("click", createNewPlayerCard);
    stopButton.addEventListener("click", computerTurn); 
}

function createCard(hand, handDiv) {

    //create new card object
    let card = new Card();

    //create elements for each 
    const cardDiv = document.createElement("div");
    const cardNumber = document.createElement("h1");
    const cardSuit = document.createElement("p");

    //div for card
    cardDiv.style.width = "120px";
    cardDiv.style.height = "175px";
    cardDiv.style.border = "1px solid black";
    cardDiv.style.display = "inline-block";

    //set values
    cardSuit.textContent = card.suit;
    cardNumber.textContent = card.number;

    //append all elements to page
    cardDiv.append(cardSuit, cardNumber);

    handDiv.append(cardDiv);

    hand.push(card);

}

//create new card in player hand and check score total
function createNewPlayerCard() {
    createCard(playerHand, playerHandDiv);
    
    //check score and disable buttons if at or above 21
    if (checkScore(playerHand) >= 21) {
        computerTurn();
    }
}

//check total of values in hand
function checkScore(hand) {
    let total = 0;
    hand.forEach(card => {
        total += card.value;
    })
    return total;
}

//computer logic
function computerTurn() {
    //remove buttons functionality
    hitButton.removeEventListener("click", createNewPlayerCard);
    stopButton.removeEventListener("click", computerTurn);

    //loop through computer logic while card total is less than 15
    let playing = true;

    while (playing) {
        
        createCard(computerHand, computerHandDiv);

        if (checkScore(computerHand) >= 15) {
            playing = false;
        }

    }

    console.log(computerHand, checkScore(computerHand)); //testing
    displayResults();
}


//check results
function displayResults() { 
    const resultsHeader = document.getElementById("results-header");
    let playerScore = checkScore(playerHand);
    let computerScore = checkScore(computerHand);

    if (playerScore > computerScore && playerScore <= 21) { //player has higher number while still being below or equal to 21
        resultsHeader.textContent = "You Win";
    } else if (computerScore > playerScore && computerScore <= 21) { //computer has higher number while still below or equal to 21
        resultsHeader.textContent = "Computer Wins";
    } else if (playerScore > 21 && computerScore <= 21) { //player goes over 21 computer does not
        resultsHeader.textContent = "Computer Wins";
    } else if (computerScore > 21 && playerScore <= 21) { //computer goes over 21 and player does not
        resultsHeader.textContent = "Player Wins";
    } else {
        resultsHeader.textContent = "Tie Game";
    }
    
}

/* OUTCOMES

    player has higher number while below or equal 21
    computer has higher number while below below or equal 21
    player goes over 21 computer does not
    computer goes over 21 player does not
    anything else is a tie

*/

/*TODO:

    add computer logic (done)
    add score checking logic (done)

    add replay button
    scorecounter
    save score locally

    after game works:
        add images for each card
        style elements

*/