const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
        lives: document.getElementById("lives"),
        btnRestart: document.querySelector(".btn-restart")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        remainingLives: 3
    },
    actions: {
        countDownTimerId: setInterval(countDown,1000),
    }
}

function restartGame() {
    state.values.currentTime = 30;
    state.view.timeLeft.textContent = state.values.currentTime;

    state.values.result = 0;
    state.view.score.textContent = state.values.result;

    state.values.remainingLives = 3;
    state.view.lives.textContent = state.values.remainingLives;

    state.actions.countDownTimerId = setInterval(countDown,1000);
    moveEnemy();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        endGame();
    }
}

function livesDown() {
    state.values.remainingLives--;
    state.view.lives.textContent = state.values.remainingLives;

    if(state.values.remainingLives <= 0) {
        endGame();
    }
}

function showButtonRestart() {
    state.view.btnRestart.addEventListener('mousedown',() => {
        restartGame();
        state.view.btnRestart.classList.add("hide");
    })
    state.view.btnRestart.classList.remove("hide");
}

function endGame() {
    state.values.currentTime = 0;
    state.view.timeLeft.textContent = state.values.currentTime;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.values.timerId);
    alert("Game Over! O seu resultado foi: "+ state.values.result);
    showButtonRestart();
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                livesDown();
            }
        })
    })
}


function initialize() {
    moveEnemy();
    addListenerHitBox();
};


initialize();