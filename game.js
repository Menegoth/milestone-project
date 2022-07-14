//dom elements
const resultsHeader = document.getElementById("results-header");
const playerHandDiv = document.getElementById("player-hand");
const computerHandDiv = document.getElementById("computer-hand");

const playerWins = document.getElementById("player-wins");
const computerWins = document.getElementById("computer-wins");

const hitButton = document.getElementById("hit");
const stopButton = document.getElementById("stop");
const replayButton = document.getElementById("replay");

//hand arrays
let playerHand = [];
let computerHand = [];

//check for local storage and set if not
window.onload = function() {
    if (!localStorage.getItem("playerWins") && !localStorage.getItem("computerWins")) {
        localStorage.setItem("playerWins", 0);
        localStorage.setItem("computerWins", 0);
    } else {
        updateScoreCounter();
    }
}

//scores
let totalPlayerWins = localStorage.getItem("playerWins");
let totalComputerWins = localStorage.getItem("computerWins");

//update scorecounter using localstorage
function updateScoreCounter() {
    playerWins.textContent = `Total Player Wins: ${localStorage.getItem("playerWins")}`;
    computerWins.textContent = `Total Computer Wins: ${localStorage.getItem("computerWins")}`;
}

//buttons now work
createButtonFunctionalities();
document.getElementById("clear").addEventListener("click", () => {
    localStorage.clear();
    localStorage.setItem("playerWins", 0);
    localStorage.setItem("computerWins", 0);
    updateScoreCounter();
});

//add cards to player array
createNewPlayerCard();
createNewPlayerCard();

//button functionalities
function createButtonFunctionalities() {
    hitButton.addEventListener("click", createNewPlayerCard);
    stopButton.addEventListener("click", computerTurn); 
}

//player logic

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

    displayResults();
}


//check results
function displayResults() { 
    let playerScore = checkScore(playerHand);
    let computerScore = checkScore(computerHand);

    if (playerScore > computerScore && playerScore <= 21) { //player has higher number while still being below or equal to 21
        resultsHeader.textContent = "Result: You Win";
        totalPlayerWins++;
    } else if (computerScore > playerScore && computerScore <= 21) { //computer has higher number while still below or equal to 21
        resultsHeader.textContent = "Result: Computer Wins";
        totalComputerWins++;
    } else if (playerScore > 21 && computerScore <= 21) { //player goes over 21 computer does not
        resultsHeader.textContent = "Result: Computer Wins";
        totalComputerWins++;
    } else if (computerScore > 21 && playerScore <= 21) { //computer goes over 21 and player does not
        resultsHeader.textContent = "Result: Player Wins";
        totalPlayerWins++;
    } else {
        resultsHeader.textContent = "Result: Tie Game";
    }

    //update local storage
    localStorage.setItem("playerWins", totalPlayerWins);
    localStorage.setItem("computerWins", totalComputerWins);

    //update scores
    updateScoreCounter();

    //make replay button work
    replayButton.addEventListener("click", restartGame);   
}

//function to restart game
function restartGame() {
    //reset both hands
    playerHand = [];
    computerHand = [];

    //edit dom
    playerHandDiv.innerHTML = "";
    computerHandDiv.innerHTML = "";
    resultsHeader.textContent = "Result: "

    //add and remove buttons
    createButtonFunctionalities()
    replayButton.removeEventListener("click", restartGame);

    //add two cards to player hand
    createNewPlayerCard();
    createNewPlayerCard();
}

/*TODO:

    add computer logic (done)
    add score checking logic (done)

    add replay button (done)
    scorecounter (done)
    save score locally (done)
    
    make it so computer cards dont disappear (after images work)

    after game works:
        add images for each card
        style elements
            buttons grayed out when not available
            background
            text
            (likely bootstrap)

*/