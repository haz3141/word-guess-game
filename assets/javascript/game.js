// Variables
let wordToGuess;    
let wordLength;
let cpuChoice;
let lettersToGuess;
let userGuess;
let hiddenWord;
let numLetters;
let numGuesses;
let userGuesses;
let numMatches;
let wins = 0;
let losses = 0;

const words = [
    'hank',
    'bobby',
    'bill',
    'peggy',
    'dale',
    'boomhauer',
    'luanne',
    'nancy',
    'johnredcorn',
    'ladybird'
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
    numGuesses = numLetters + 3;
    userGuesses = [];
    numMatches = 0;

    // Create hidden word
    for (let i = 0; i < numLetters; i++) {
        hiddenWord.push('-');
    }

    console.log(wordToGuess);
    console.log(lettersToGuess);
    console.log(numLetters);
    console.log(hiddenWord);
    document.querySelector('#hiddenWord').innerHTML = hiddenWord;
    console.log(numGuesses);
    document.querySelector('#numGuesses').innerHTML = 'Guesses Left: ' + numGuesses;

};

function checkMatch(userGuess) {

    if (lettersToGuess.includes(userGuess)) {
        console.log("bingo");
        for (let i = 0; i < numLetters; i++) {
            if (userGuess === lettersToGuess[i]) {
                console.log("It's a match");
                hiddenWord[i] = userGuess;
                console.log(hiddenWord);
                document.querySelector('#hiddenWord').innerHTML = hiddenWord;
                numMatches++;
            } 
        }
    } else {
        numGuesses--;
        userGuesses.push(userGuess);
        console.log(userGuesses);
        console.log('numGuesses: ' + numGuesses);
        document.querySelector('#userGuesses').innerHTML = 'Guesses: ' + userGuesses;
        document.querySelector('#numGuesses').innerHTML = 'Guesses Left: ' + numGuesses;
    }

    checkWinLoss();
};

function checkRepeat(userGuess) {

    if (userGuesses.includes(userGuess) || hiddenWord.includes(userGuess)) {
        console.log('REPEAT');
    } else {
        checkMatch(userGuess);
    }
}

function checkWinLoss() {
    if (numMatches === numLetters && numGuesses > 0) {
        console.log('WINNER');
        wins++;
        document.querySelector('#wins').innerHTML = 'Wins: ' + wins;
        beginGame();
    } else if (numGuesses === 0) {
        losses++;
        console.log('LOSER');
        document.querySelector('#losses').innerHTML = 'Losses: ' + losses;
        beginGame();
    }
}

// Start the game
beginGame();

// Run whenever key is pressed
document.onkeyup = function(event) {

    // Store user guess
    userGuess = event.key.toLowerCase();
    console.log(userGuess);

    // Checks for repeat presses
    checkRepeat(userGuess);
};
