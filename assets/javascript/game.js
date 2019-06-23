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
let themeSong = document.getElementById('themeSong');
let lossSong = document.getElementById('lossSong');

// Array of potential names for the game
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

// Start a new game
function beginGame() {

    // Checks to see if hidden video should be shown
    easterEgg();

    // Assign random word, split letters, find number of letters
    wordToGuess = randWord();
    lettersToGuess = wordToGuess.split('');
    numLetters = lettersToGuess.length;
    hiddenWord = [];
    numGuesses = numLetters + 3; // Allow for three more guesses than letters in the chosen word
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
    console.log(numGuesses);

    // Reset the hidden word, number of guesses, and the guessed letters
    document.querySelector('#hiddenWord').innerHTML = hiddenWord;
    document.querySelector('#numGuesses').innerHTML = 'Guesses Left: ' + numGuesses;
    document.querySelector('#userGuesses').innerHTML = 'Guesses: ' + userGuesses;

};

// Checks for matching letter from user's choice
function checkMatch(userGuess) {

    // Runs if the user selected a matching letter
    if (lettersToGuess.includes(userGuess)) {
        console.log("bingo");

        // This will check the matching letter and replace it in the hidden word
        for (let i = 0; i < numLetters; i++) {
            if (userGuess === lettersToGuess[i]) {

                hiddenWord[i] = userGuess;
                document.querySelector('#hiddenWord').innerHTML = hiddenWord;

                // This is used in order to determine if all letters have been matched
                numMatches++;

                console.log("It's a match");
                console.log(hiddenWord);
            } 
        }
    // Runs if the user selected a non-matching letter
    } else {
        // Decrease number of remaining guesses
        numGuesses--;

        // Add the user's guess to the non-matching guesses and rewrite info to the screen
        userGuesses.push(userGuess);
        document.querySelector('#userGuesses').innerHTML = 'Guesses: ' + userGuesses;
        document.querySelector('#numGuesses').innerHTML = 'Guesses Left: ' + numGuesses;

        console.log(userGuesses);
        console.log('numGuesses: ' + numGuesses);
    }

    // Runs after each match or mismatch to determine if the game has been won or lost
    checkWinLoss();
};

// Is used to determine if the user has reused a letter before checking for a match or mismatch
function checkRepeat(userGuess) {
    if (userGuesses.includes(userGuess) || hiddenWord.includes(userGuess)) {
        console.log('REPEAT');
    } else {
        // If it's a fresh letter we check for a match
        checkMatch(userGuess);
    }
}

// This is used to determine if the game has been won or lost
function checkWinLoss() {

    // This runs when the number of matches is equal to the number of letters and the guesses remaining are more than zero
    if (numMatches === numLetters && numGuesses > 0) {
        
        // Wins are incremented, written to the page, and a new game is started
        console.log('WINNER');
        wins++;
        document.querySelector('#wins').innerHTML = 'Wins: ' + wins;
        // Play theme song when wins
        playThemeSong();
        beginGame();

        

    // This runs when the user has run out of guesses 
    } else if (numGuesses === 0) {
        
        // Losses are incremented, written to the page, and a new game is started
        console.log('LOSER');
        losses++;
        document.querySelector('#losses').innerHTML = 'Losses: ' + losses;
        // Play loss audio
        playLossSong();
        beginGame();
    }
}

// Function for playing the KoH theme song
function playThemeSong() {
    themeSong.play();
}

// Function for pausing the KoH theme song
function pauseThemeSong() {
    themeSong.pause();
}

function playLossSong() {
    lossSong.play();
}

// Function for showing hidden div with video
// Video shows after three wins
function easterEgg() {
    let x = document.getElementById("easterEgg");
    if (wins >= 3) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// Start the game for the first time here
beginGame();

// Run whenever key is pressed
document.onkeyup = function(event) {

    // Pause the song when a new game starts
    // pauseThemeSong();

    // Store user guess as a lowercase letter
    userGuess = event.key.toLowerCase();
    console.log(userGuess);

    // Checks for repeat presses which will subsequently run other functions
    checkRepeat(userGuess);
};
