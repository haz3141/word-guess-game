// Variables
let wordToGuess;    
let wordLength;
let cpuChoice;
let lettersToGuess;
let userGuess;
let hiddenWord;
let numLetters;

const words = [
    'hank',
    'bobby',
    'bill'
];

// Random Word Function
function randWord() {
    cpuChoice = words[Math.floor(Math.random() * words.length)];
    return cpuChoice;
};

function beginGame() {

    // Assign random word, split letters, find number of letters
    wordToGuess = randWord();
    lettersToGuess = wordToGuess.split('');
    numLetters = lettersToGuess.length;
    hiddenWord = [];

    // Create hidden word
    for (let i = 0; i < numLetters; i++) {
        hiddenWord.push('-');
    }

    console.log(wordToGuess);
    console.log(lettersToGuess);
    console.log(numLetters);
    console.log(hiddenWord);

};

// Start the game
beginGame();

// Run whenever key is pressed
document.onkeyup = function(event) {

    // Store user guess
    userGuess = event.key.toLowerCase();
    console.log(userGuess);

};
