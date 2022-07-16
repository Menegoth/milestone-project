//getting DOM elements

//Divs
const playerHandDiv = document.getElementById("player-hand");
const computerHandDiv = document.getElementById("computer-hand");

//Headers
const resultsHeader = document.getElementById("results-header");
const playerHandTotal = document.getElementById("player-hand-total");
const computerHandTotal = document.getElementById("computer-hand-total");
const playerWins = document.getElementById("player-wins");
const computerWins = document.getElementById("computer-wins");

//buttons
const hitButton = document.getElementById("hit");
const stopButton = document.getElementById("stop");
const replayButton = document.getElementById("replay");
const clearButton = document.getElementById("clear");

//check for local variables to save win count between sessions, creates local variables if not
window.onload = function() {
    if (!localStorage.getItem("playerWins") || !localStorage.getItem("computerWins")) {
        localStorage.setItem("playerWins", 0);
        localStorage.setItem("computerWins", 0);
    } else {
        updateScoreCounter();
    }
}

//hand arrays, will be using these to manage deck
let playerHand = [];
let computerHand = [];
initializeHands();

//variables keeping track of the total wins
let totalPlayerWins = localStorage.getItem("playerWins");
let totalComputerWins = localStorage.getItem("computerWins");

//button functionalities
hitButton.addEventListener("click", createNewPlayerCard);
stopButton.addEventListener("click", computerTurn); 
replayButton.addEventListener("click", restartGame);
//resets win variables and updates the score counter
clearButton.addEventListener("click", () => {
    localStorage.setItem("playerWins", 0);
    localStorage.setItem("computerWins", 0);
    totalPlayerWins = 0;
    totalComputerWins = 0;
    updateScoreCounter();
});

//initialize hands
function initializeHands() {
    //add cards to player array
    createNewPlayerCard();
    createNewPlayerCard();

    //create card backs for the computer hand using images
    const cardBackOne = document.createElement("img");
    cardBackOne.src = "./images/back.png";
    cardBackOne.style.width = "8em";
    cardBackOne.classList = "mx-1 my-1"

    const cardBackTwo = document.createElement("img");
    cardBackTwo.src = "./images/back.png";
    cardBackTwo.style.width = "8em";
    cardBackTwo.classList = "mx-1 my-1";

    //append images and div to HTML
    computerHandDiv.append(cardBackOne);
    computerHandDiv.append(cardBackTwo);

    //recalculate player counter and reset computer counter
    updateHandTotal(playerHandTotal, playerHand);
    computerHandTotal.textContent = "(?)";

}

//disable a button
function disableButton(button) {
    button.setAttribute("disabled", "");
}

//enable a button
function enableButton(button) {
    button.removeAttribute("disabled");
}

//update scorecounter using localstorage
function updateScoreCounter() {
    playerWins.textContent = `Total Player Wins: ${localStorage.getItem("playerWins")}`;
    computerWins.textContent = `Total Computer Wins: ${localStorage.getItem("computerWins")}`;
}

//create a card and add it to specified div
function createCard(hand, handDiv) {

    //create new card object
    let card = new Card();

    //create image based on suit and number
    const cardImg = document.createElement("img");
    cardImg.src = card.imageSrc;
    cardImg.style.width = "8em";
    cardImg.classList = "mx-1 my-1"

    //append all elements to page
    handDiv.append(cardImg);

    hand.push(card);

}

//create new card in player hand and check score total
function createNewPlayerCard() {
    //stop player from drawing more than 6 cards to not flood the screen
    if (playerHand.length < 6) {       
        createCard(playerHand, playerHandDiv);
        updateHandTotal(playerHandTotal, playerHand);
    }
}

//loop through a hand to calculate total
function checkScore(hand) {
    let total = 0;
    hand.forEach(card => {
        total += card.value;
    })
    return total;
}

//update total of cards in a header
function updateHandTotal(header, hand) {
    header.textContent = `(${checkScore(hand)})`
}

//computer logic
function computerTurn() {
    //clear hand of card backs
    computerHandDiv.innerHTML = "";

    //disable buttons
    disableButton(hitButton);
    disableButton(stopButton);

    //use a loop to add cards to the computer's hand while total is less than 15
    let playing = true;

    while (playing) {      
        if (checkScore(computerHand) < 15) {
            createCard(computerHand, computerHandDiv);
            updateHandTotal(computerHandTotal, computerHand);
        } else {
            playing = false;
        }
    }

    displayResults();
}


//check results
function displayResults() { 
    //calculate total score for both players
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

    //enable replay button
    enableButton(replayButton);
}

//function to restart game
function restartGame() {
    //reset both hands
    playerHand = [];
    computerHand = [];

    //clear hands and result
    playerHandDiv.innerHTML = "";
    computerHandDiv.innerHTML = "";
    resultsHeader.textContent = "Result: "

    //add and remove buttons
    enableButton(hitButton);
    enableButton(stopButton);
    disableButton(replayButton);

    //re-initialize hands
    initializeHands();
}