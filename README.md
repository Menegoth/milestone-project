# milestone-project

## How To Play

Blackjack game for the first milestone project of the course. Press hit to draw a new card or stop to let the computer take its turn.
Get as close to 21 without going over to win. Replay button starts a new game and clear button clears saved scores.

## Inspiration

I was originally going to something simpler like tic tac toe or asteroiids, but decided to attempt blackjack so I could practice with classes.

## How It Works

1. Cards
  * A class that when initiated automatically randomly assigns itself a suit and number. Using suit and number the card is assigned a value and an image source.
2. Storing Scores
  * Using `window.onload()` I check for the existenc of two local storage variables saving player score and computer score. 
    If they exist I assign the elements on the page the value stored. If they are not found, I create local variables to save score.
3. Adding Cards to the Screen
  * After creadding a new card in the `createCard()` function, an image tag is created using the card object's `imageSrc` attribute, adding the correct card to the screen.
    The card is also pushed to an array containing either the player's hand or the computer's hand.
4. Checking Score
  * Hands are stored in an array, so a simple for each returns the value by taking the card objects `value` properties and adding them together.
5. Computer Logic
  * Nothing complicated. The AI loops drawing a card until it has a score of 15 or over.
6. Checking Results
  * Takes combined values of both hand arrays and goes through 5 checks to understand what the outcome of the game was.
7. Restarting Game
  * Resets game to its original state by emptying both hands and resetting HTML elements. Buttons are also re-enabled and cards are added to both hands afterwards.
  
  ## Possible changes for the future
    * It is currently possible to get duplicate cards. Possible to loop through the hand array each time a new card is created to check for a repeat.
      Add functionality in the class to reroll suit and number values. 
    * Possibly use the deck API which I found out about towards the end to make managing the deck more simple.
    * Currently not possible to choose between 1 or 11 for the ace's values.
