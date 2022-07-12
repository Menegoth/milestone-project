//card object
class Card {

    constructor(suit, number) {
        this.suit = suit;
        this.number = number;
        this.value = this.generateValue();
    }

    generateValue() {
        switch(this.number) {
            case "one":
                return 1;
            case "two":
                return 2;
            case "three":
                return 3;
            case "four":
                return 4;
            case "five":
                return 5;
            case "six":
                return 6;
            case "seven":
                return 7;
            case "eight":
                return 8;
            case "nine":
                return 9;
            case "ten":
            case "jack":
            case "queen":
            case "king":
                return 10;
            case "ace":
                return 11;
        }
    }

}

//array of suits and cards and pick random
function pickSuit() {

    let suits = ["clubs", "hearts", "diamonds", "spades"];
    return suits[Math.floor(Math.random() * suits.length)];

}

function pickCard() {

    let cards = ["ace", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
    return cards[Math.floor(Math.random() * cards.length)];

}

