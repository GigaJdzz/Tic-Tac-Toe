const cells = document.querySelectorAll(".carre");
const xs_turn = document.querySelector(".turn-x");
const os_turn = document.querySelector(".turn-o");
const restartBtn = document.querySelector(".restart");
const statusText = document.querySelector("h2");
let player = "X";
let running = false;

let grid = ["", "", "", "", "", "", "", "", ""];

let winning_combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    running = true;
    changeTurnBtn();
    cells.forEach(cell => {
        cell.addEventListener('click', playround)
    }); 
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${player}'s turn`;
}

function playround() {
    const cellIndex = this.getAttribute("cellIndex");

    if (grid[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    let roundDone = checkWinner();
    if (!roundDone) {
        changeTurn();
    }

}

function updateCell(cell, cellIndex) {
    grid[cellIndex] = player;
    cell.textContent = player;
}

function checkWinner() {
    let roundDone = false;

    for (let i = 0; i < winning_combs.length; i++) {
        const comb = winning_combs[i];
        const first = grid[comb[0]];
        const scnd = grid[comb[1]];
        const third = grid[comb[2]];

        if (first === "" || scnd === "" || third === "") {
            continue;
        }

        if (first === scnd && first === third) {
            running = false;
            statusText.textContent = `${player} wins :)`;
            roundDone = true;
            break;
        }
    }

    if (!roundDone && !grid.includes("")) {
        running = false;
        statusText.textContent = "Draw!";
        roundDone = true;
    }

    return roundDone;
}

function changeTurn() {
    if (player === "X") {
        player = "O";
    } else {
        player = "X";
    }
    statusText.textContent = `${player}'s turn`;
    changeTurnBtn();
}

function changeTurnBtn() {
    if (player === "X") {
        xs_turn.style.background = "white";
        xs_turn.style.color = "black";
        os_turn.style.background = "black";
        os_turn.style.color = "white";
    } else {
        os_turn.style.background = "white";
        os_turn.style.color = "black";
        xs_turn.style.background = "black";
        xs_turn.style.color = "white";
    }
}

function restartGame() {
    running = true;
    grid = ["", "", "", "", "", "", "", "", ""]
    cells.forEach(cell => {
        cell.textContent = "";
    });
    player = "X"
    statusText.textContent = `${player}'s turn`;
}