let computerMove = "";
let result = "";

let score = (JSON.parse(localStorage.getItem("score"))) || {
    win:0,
    lose:0,
    tie:0
};

function ComputerMove() {
    const randomNum = Math.random();

    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1/3) {
        computerMove = "Rock"
    } else if (randomNum >= 1/3 && randomNum < 2/3) {
        computerMove = "Paper";
    } else if (randomNum >= 2/3 && randomNum <1) {
        computerMove = "Scissors";
    }
    return computerMove;
}


function playGame(guess) {

    const computerMove = ComputerMove();

    if (guess === "Scissors") {
        if (computerMove === "Rock") {
            result = "you lose.";
        } else if (computerMove === "Paper") {
            result = "you win.";
        } else if (computerMove === "Scissors") {
            result = "Tie."; 
        }
    }
    else if (guess === "Rock") {
        if (computerMove === "Rock") {
            result = "Tie.";
        } else if (computerMove === "Paper") {
            result = "you lose.";
        } else if (computerMove === "Scissors") {
            result = "you win."; 
        }
    }
    else if (guess === "Paper") {
        if (computerMove === "Rock") {
            result = "you win.";
        } else if (computerMove === "Paper") {
            result = "Tie.";
        } else if (computerMove === "Scissors") {
            result = "you lose."; 
        }
    }

    if (result === "you win.") {
        score.win += 1;
    }else if (result === "you lose.") {
        score.lose += 1;
    }else if (result === "Tie.") {
        score.tie += 1;
    }

    /* localStorage only support string */
    localStorage.setItem("score",JSON.stringify(score));

    updateScore();

    document.getElementById("board").innerHTML = (`you picked ${guess} - Computer picked ${computerMove}`);

    document.querySelector("#board1").innerHTML = result


  // document.getElementById("board1").innerHTML = (`win ${score.win} , lose ${score.lose}, tie ${score.tie} `)
}

function updateScore() {
    document.querySelector(".js-score").innerHTML = (`win ${score.win} , lose ${score.lose}, tie ${score.tie} `);
}

let isAutoPlay = false;
let intervalid;

function autoplay() {
    let js_stop = document.querySelector("#js-auto-play-button")
    if (!isAutoPlay) {
        intervalid = setInterval(() => {
            const autoMove = ComputerMove()
            playGame(autoMove)}
        ,1000)
        isAutoPlay = true;
        if (js_stop) {
            js_stop.innerHTML = "Stop";
        }
    } else {
        clearInterval(intervalid)
        isAutoPlay = false;
        if (js_stop) {
            js_stop.innerHTML = "Autoplay"
        }
    }
    
}

function reset() {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem("score")
    updateScore();
    document.getElementById("board").innerHTML = "";

    document.querySelector("#board1").innerHTML = ""
//    document.getElementById("board1").innerHTML = (`win ${score.win} , lose ${score.lose}, tie ${score.tie} `);

}

document.querySelector(".js-rock-button").addEventListener("click", ()=> {
    playGame("Rock")
})

document.querySelector(".js-paper-button").addEventListener("click", ()=> {
    playGame("Paper")
})
document.querySelector(".js-scissors-button").addEventListener("click", ()=> {
    playGame("Scissors")
})
document.querySelector(".reset-score-button").addEventListener("click", ()=> {
    showConfirmation ()
    hideButton ()
})
document.querySelector("#js-auto-play-button").addEventListener("click", ()=> {
    autoplay()
})

document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
        playGame("Rock") 
    } else if (event.key === "p" || event.key === "P") {
        playGame("Paper") 
    } else if (event.key === "s" || event.key === "S") {
        playGame("Scissors") 
    } else if (event.key === "a" || event.key === "A") {
        autoplay()
    } else if (event.key === "Backspace") {
        showConfirmation ()
        hideButton ()
    }
})

let confimation = document.querySelector(".js-confirmation")

function showConfirmation () {

    confimation.innerHTML = `Are you sure to Reset the Score 
    <button class = "js-reset-confirm-yes reset-confirm-button"> Yes </button>
    <button class = "js-reset-confirm-no reset-confirm-button"> No </button>`

    let yes = document.querySelector(".js-reset-confirm-yes")
    yes.addEventListener("click", () => {
        reset()
        hideconfirmation ()
        showButton ()
    })
    let no = document.querySelector(".js-reset-confirm-no")
    no.addEventListener("click", () => {
        hideconfirmation ()
        showButton ()
    })
}

function hideconfirmation () {
    confimation.innerHTML=""
}

function hideButton () {
    document.querySelector(".reset-score-button").style.display = "none"
    document.querySelector(".auto-play-button").style.display = "none"
}
function showButton () {
    document.querySelector(".reset-score-button").style.display = "inline-block"
    document.querySelector(".auto-play-button").style.display = "inline-block"
}
