// List of words for the game
const wordList = [
    "cat", "cow", "fox", "hyena", "lion", "leopard", "tiger", "jaguar", "bear", "snake",
    "elephant", "dog", "giraffe", "zebra", "monkey", "dolphin", "penguin", "eagle", "kangaroo", "owl",
    "horse", "rabbit", "koala", "crocodile", "octopus"
];

// Variables
let wordToGuess = "";
let guessedWord = [];
let incorrectGuesses = [];
let attempts = 10;

// Elements
const wordDisplay = document.getElementById("word-display");
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");

// Initialize the game
function initializeGame() {
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    guessedWord = Array(wordToGuess.length).fill("_");
    incorrectGuesses = [];
    attempts = 10;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(" ");
    incorrectGuessesDisplay.textContent = "Incorrect Guesses: " + incorrectGuesses.join(", ");
    message.textContent = "";

    if (guessedWord.join("") === wordToGuess) {
        message.textContent = "Congratulations! You guessed the word!";
    } else if (attempts === 0) {
        message.textContent = "Sorry, you're out of attempts. The word was: " + wordToGuess;
    }
}

// Handle guess button click
guessButton.addEventListener("click", function() {
    const guess = guessInput.value.toLowerCase();

    if (!guess.match(/[a-z]/) || guess.length !== 1) {
        message.textContent = "Please enter a single letter.";
        return;
    }

    if (guessedWord.includes(guess) || incorrectGuesses.includes(guess)) {
        message.textContent = "You've already guessed that letter.";
        return;
    }

    if (wordToGuess.includes(guess)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        incorrectGuesses.push(guess);
        attempts--;
    }

    guessInput.value = "";
    updateDisplay();
});

// Initialize the game on page load
initializeGame();