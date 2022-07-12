//create player hand array to add cards to
let playerHand = [];
createNewPlayerCard();
createNewPlayerCard();

const hitButton = document.getElementById("hit");
const stopButton = document.getElementById("stop");

createButtonFunctionalities();

//button functionalities
function createButtonFunctionalities() {
    hitButton.addEventListener("click", createNewPlayerCard);
    stopButton.addEventListener("click", displayResults); //WILL BE CHANGED WHEN COMPUTER IS ADDED
}

function createNewPlayerCard() {

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

    document.getElementById("player-hand").append(cardDiv);

    playerHand.push(card);

    //check score and disable buttons if at or above 21
    if (checkScore(playerHand) >= 21) {
        displayResults();
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

//check results
//TESTING ONLY logic will be changed when computer is added
function displayResults() { 
    //remove button functionality
    hitButton.removeEventListener("click", createNewPlayerCard);
    stopButton.removeEventListener("click", displayResults);

    const results = document.getElementById("results-header");
    let playerScore = checkScore(playerHand);

    if (playerScore < 21) {
        results.textContent = "less than 21 but still win"
    } else if (playerScore == 21) {
        results.textContent = "you win";
    } else {
        results.textContent = "you lose"
    }
}

/*TODO:

    add computer logic
    add score checking logic

    add replay button
    scorecounter
    save score locally

    after game works:
        add images for each card
        style elements

*/