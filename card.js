//card object
class Card {

    //create suit, number and value using class functions
    constructor() {
        this.suit = this.pickSuit();
        this.number = this.pickCard();
        this.value = this.generateValue();
    }

    //pick suit randomly based on array of suits
    pickSuit() {

        let suits = ["clubs", "hearts", "diamonds", "spades"];
        return suits[Math.floor(Math.random() * suits.length)];
    
    }
    
    //pick card number randomly based on array 
    pickCard() {
    
        let cards = ["ace", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
        return cards[Math.floor(Math.random() * cards.length)];
    
    }    

    //generate card value based on card number
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