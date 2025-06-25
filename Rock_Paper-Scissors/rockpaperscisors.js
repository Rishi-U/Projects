let score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    lose: 0,
    tie: 0
};

// --- Theme Management ---
const bodyElement = document.body;
const themeToggleButton = document.getElementById("js-theme-toggle-button");

// Function to apply the stored theme or default
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-theme') {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
    } else { // Default to dark-theme or if no theme is saved
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
    }
}

// Initial application of theme on page load
applyTheme();

function toggleTheme() {
    if (bodyElement.classList.contains('dark-theme')) {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
}
// --- End Theme Management ---


// Display initial score when the page loads
updateScore();

let isAutoPlay = false;
let intervalId;

function ComputerMove() {
    const randomNum = Math.random();
    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = "Rock";
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = "Paper";
    } else {
        computerMove = "Scissors";
    }
    return computerMove;
}

function playGame(playerMove) {
    const computerMove = ComputerMove();
    let result = "";

    if (playerMove === "Scissors") {
        if (computerMove === "Rock") {
            result = "You lose.";
        } else if (computerMove === "Paper") {
            result = "You win.";
        } else {
            result = "Tie.";
        }
    } else if (playerMove === "Rock") {
        if (computerMove === "Rock") {
            result = "Tie.";
        } else if (computerMove === "Paper") {
            result = "You lose.";
        } else {
            result = "You win.";
        }
    } else if (playerMove === "Paper") {
        if (computerMove === "Rock") {
            result = "You win.";
        } else if (computerMove === "Paper") {
            result = "Tie.";
        } else {
            result = "You lose.";
        }
    }

    if (result === "You win.") {
        score.win += 1;
    } else if (result === "You lose.") {
        score.lose += 1;
    } else {
        score.tie += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));
    updateScore();

    document.getElementById("board").innerHTML = `You picked ${playerMove} - Computer picked ${computerMove}`;
    document.querySelector("#board1").innerHTML = result;
}

function updateScore() {
    document.querySelector(".js-score").innerHTML = `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

function autoplay() {
    const autoPlayButton = document.getElementById("js-auto-play-button");

    if (!isAutoPlay) {
        intervalId = setInterval(() => {
            const autoMove = ComputerMove();
            playGame(autoMove);
        }, 1000);
        isAutoPlay = true;
        autoPlayButton.innerHTML = "Stop Autoplay";
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
        autoPlayButton.innerHTML = "Autoplay";
    }
}

function resetScore() {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem("score");
    updateScore();
    document.getElementById("board").innerHTML = "";
    document.querySelector("#board1").innerHTML = "";
}

function showConfirmation() {
    const confirmationElement = document.querySelector(".js-confirmation");
    confirmationElement.innerHTML = `Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
    <button class="js-reset-confirm-no reset-confirm-button">No</button>`;

    hideMainButtons();

    document.querySelector(".js-reset-confirm-yes").addEventListener("click", () => {
        resetScore();
        hideConfirmation();
        showMainButtons();
    });

    document.querySelector(".js-reset-confirm-no").addEventListener("click", () => {
        hideConfirmation();
        showMainButtons();
    });
}

function hideConfirmation() {
    document.querySelector(".js-confirmation").innerHTML = "";
}

function hideMainButtons() {
    document.querySelector(".reset-score-button").style.display = "none";
    document.querySelector(".auto-play-button").style.display = "none";
    document.querySelector(".theme-toggle-button").style.display = "none"; // Hide theme button too
}

function showMainButtons() {
    document.querySelector(".reset-score-button").style.display = "inline-block";
    document.querySelector(".auto-play-button").style.display = "inline-block";
    document.querySelector(".theme-toggle-button").style.display = "inline-block"; // Show theme button too
}

// --- Event Listeners ---
document.querySelector(".js-rock-button").addEventListener("click", () => {
    playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
    playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
    playGame("Scissors");
});

document.querySelector(".reset-score-button").addEventListener("click", () => {
    showConfirmation();
});

document.querySelector("#js-auto-play-button").addEventListener("click", () => {
    autoplay();
});

themeToggleButton.addEventListener("click", () => { // Event listener for new theme button
    toggleTheme();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
        playGame("Rock");
    } else if (event.key === "p" || event.key === "P") {
        playGame("Paper");
    } else if (event.key === "s" || event.key === "S") {
        playGame("Scissors");
    } else if (event.key === "a" || event.key === "A") {
        autoplay();
    } else if (event.key === "Escape") {
        showConfirmation();
    } else if (event.key === "t" || event.key === "T") { // New shortcut for theme toggle
        toggleTheme();
    }
});