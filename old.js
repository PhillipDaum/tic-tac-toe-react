// GLOBAL VARIABLES
const game = document.getElementById("game-board");
const symbolChoices = ["X", "O"];
let humanSymbol,
    isHumanTurn,
    computerSymbol;
let winner = false;
const gameBoard = ["", "", "", "", "", "", "", "", ""];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/////  STATE 1 - USER PICKS X or O
// assigns values to humanSymbol and computerSymbol, if human chooses O, starts computer turn
const assignSymbols = (s) => {
    if (s === "X") {
        humanSymbol = "X";
        computerSymbol = "O"
        isHumanTurn = true;
    } else {
        humanSymbol = "O";
        computerSymbol = "X";
        isHumanTurn = false;
        // prolly need to other stuff per instructions
        console.log("waiting....")
        setTimeout(() => {computerTurn(gameBoard)}, 1500);
    }
}
// user can select symbol, calls functions to make gameboard and assign symbols, removes state 1, calls state 2
const onFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    form.reset();
    if (dataObject.humanSymbol != undefined) {
        game.innerHTML = "";
        makeBoard(gameBoard);
        assignSymbols(dataObject.humanSymbol)
    }
}
// builds the thing to 
const showSymbolPicker = () => {
    let form = document.createElement('form');
    form.id = "form";
    game.appendChild(form);
    // switch this to array
    for (let item of symbolChoices) {
        let label = document.createElement("label"),
            input = document.createElement('input');
        label.innerText = item;
        input.type = "radio";
        input.name = "humanSymbol"
        input.value = item;
        label.appendChild(input);
        form.appendChild(label);
    }
    let button = document.createElement('button');
    button.type = 'submit';
    button.id = "submit";
    button.innerText = "New game (vs cpu)"; // change to match
    form.appendChild(button)
    form.addEventListener("submit", onFormSubmit)
}


// STATE 2 - play the game
const checkWinningSets = (symbol, arr, twoDimArr) => {
    // make a mini arr with indices of symbol from gameBoard
    let checkMe = arr.map((x, i) => x === symbol ? i : -1); // better way to do this? // there is a way. // this one is ok
    checkMe = checkMe.filter((x) => x >= 0);
    // change this to running the announce winner function
    // and change the winner thing to true;
    twoDimArr.forEach((x) => x.every(item => checkMe.includes(item)) ? console.log("winner") : console.log("loser")); // https://www.reddit.com/r/learnjavascript/comments/136sq2m/is_there_a_simple_or_fancy_way_to_check_if_two/
}

const refreshGameBoard = (arr) => arr.forEach((x, i) => document.getElementById(i).innerText = x);

const computerTurn = (arr) => {
    // make new array with indecies of empty spots
    let openSpots = arr.map((x, i) => x === "" ? i : -1);
    openSpots = openSpots.filter((x) => x >= 0);
    // computer picks a random one of these
    let computerChoice = openSpots[Math.floor(Math.random() * openSpots.length)];
    // splices it into the array
    gameBoard.splice(computerChoice, 1, computerSymbol);
    // refresh the gameboard from the gameboard 
    refreshGameBoard(gameBoard);
    // checkWinningSets(computerSymbol, gameBoard, winningCombos);
    if (winner === false && isHumanTurn === false) {
        isHumanTurn = true;
    }
}

const humanTurn = () => {
    if (isHumanTurn === true) {
        let spot = event.target;
        if (spot.classList.contains("empty")) {
            // put human's symbol into gameBoard array
            gameBoard.splice(spot.id, 1, humanSymbol)
            // refresh the gameboard from the gameboard 
            refreshGameBoard(gameBoard);
            checkWinningSets(humanSymbol, gameBoard, winningCombos);
            // if no winner to declare give the robot its turn
            if (winner === false) {
                isHumanTurn = false;
                setTimeout(() => {computerTurn(gameBoard)}, 1500);
            }
        }
    }
}

const makeBoard = (arr) => {
    const grid = document.createElement("section");
    grid.setAttribute("class", "grid");
    game.appendChild(grid);
    arr.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", "empty");
        cell.id = (index);
        grid.appendChild(cell);
        cell.addEventListener('click', humanTurn);
    });
};



const gameplay = () => {
    showSymbolPicker()
    // put the other functions in here
    // maybe do onload instead ?
}
gameplay()