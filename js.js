let gameSize;
let side = 100;
let height;
let width;
let gameField;
let step;
let count;


window.onload = function () {
    document.getElementById("myModal").setAttribute("style", "display: block");
};

function startGame() {
    gameSize = parseInt(document.getElementById("gameSize").value);
    height = gameSize * side;
    width = gameSize * side;
    gameField = [gameSize];
    count = parseInt(setWinLineSize());
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    clearData();
    populateArrayWithValues();// fill the array with initial values
    printGame();// draw game field
    step = 0;
    game.onclick = function(event) {
        if (event.target.className === "block") {
            let id = event.target.getAttribute("id");
            let array = id.split(',');
            let i = array[0];
            let j = array[1];

            (step % 2 === 0) ? gameField[i][j].val = "X": gameField[i][j].val = "0";
            (step % 2 === 0) ? document.getElementById("player").innerText = "Next player '0'":
                document.getElementById("player").innerText = "Next player 'X'";

            step++;

            if (!checkWinner()) {
                // check standoff ,print message result
                if (step === gameSize * gameSize) {
                    game.setAttribute("class", "disabled");
                    let winner = document.getElementById("winner");
                    winner.innerText = "No winner!";
                }
            }

            let cell = document.getElementById(id);
            cell.setAttribute("class", "closed");
            cell.innerText = gameField[i][j].val;
        }
    }
}


function setWinLineSize () {
    let inputCount = document.getElementById("winLineSize").value;
    if( inputCount > gameSize){
        inputCount = gameSize;
    }
    return inputCount;
}
// fill the array with initial values
function populateArrayWithValues() {
    for (let i = 0; i < gameSize; i++) {
        let line = [gameSize];
        for (let j = 0; j < gameSize; j++) {
            line[j] = new Cell(i, j, "");
        }
        gameField[i] = line;
    }
}

//check winner combination
function checkWinner() {
    if (checkHorizontal()) return true;
    if (checkVertical()) return true;
    if (checkDiagonalFromLeftToRight()) return true;
    if (checkDiagonalFromRightToLeft()) return true;
    return false;
}

function clearData() {
    document.getElementById("player").innerText="First player 'X'";
    let game = document.getElementById("game");
    game.innerHTML = "";
    game.removeAttribute("class");
    game.setAttribute("style", "width: " + width + "px; " + "height: " + height + "px");
    document.getElementById("winner").innerText=""
}

//print array and update array's attributes and value
function printGame() {
    let game = document.getElementById("game");
    game.innerHTML = "";
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            let htmlElem = document.createElement("div");
            htmlElem.setAttribute("id", i + ',' + j);
            htmlElem.innerText = "";
            htmlElem.setAttribute("class", "block");
            game.appendChild(htmlElem);
        }
    }
}

// check horizontal winner combination
function checkHorizontal(){
    for (let i = 0; i < gameSize; i++) {
        let line = gameField[i];
        if(isContaineWinCombination(line, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(line, "0")) {
            printWinner();
            return true;
        }
    }
    return false;
}

// check vertical winner combination
function checkVertical(){
    let array = [gameSize];
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            array[j] = gameField[j][i];
        }
        if(isContaineWinCombination(array, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(array, "0")) {
            printWinner();
            return true;
        }
    }
    return false;
}

// check left diagonal winner combination
function checkDiagonalFromLeftToRight(){
    for (let i = 0; i < gameSize; i++) {
        let array = [i + 1];
        let iCounter = gameSize - 1 - i;
        for (let j = 0; j < i + 1; j++ ) {
            array[j] = gameField[iCounter][j];
            iCounter++;
        }

        if (isContaineWinCombination(array, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(array, "0")) {
            printWinner();
            return true;
        }
    }

    for (let i = 0; i < gameSize; i++) {
        let array = [i + 1];
        let iCounter = gameSize - 1 - i;
        for (let j = 0; j < i + 1; j++ ) {
            array[j] = gameField[j][iCounter];
            iCounter++;
        }

        if (isContaineWinCombination(array, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(array, "0")) {
            printWinner();
            return true;
        }
    }

    return false;
}

// check right diagonal winner combination
function checkDiagonalFromRightToLeft(){
    for (let i = gameSize-1; i >=0; i--) {
        let array = [i + 1];
        let iCounter = i;
        for (let j = 0; j <=i; j++ ) {
            array[j] = gameField[iCounter][j];
            iCounter--;
        }

        if (isContaineWinCombination(array, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(array, "0")) {
            printWinner();
            return true;
        }
    }

    for (let i = 0; i < gameSize; i++) {
        let array = [gameSize-i];
        let iCounter = i;
        for (let j = gameSize - 1; j >= i; j--) {
            array[j - i] = gameField[iCounter][j];
            iCounter++;
        }

        if (isContaineWinCombination(array, "X")) {
            printWinner();
            return true;
        }
        if (isContaineWinCombination(array, "0")) {
            printWinner();
            return true;
        }
    }

    return false;
}

//check all value X or 0 in array, return boolean
function isContaineWinCombination(arr, val) {
    let counter = 0;
    let firstCell;
    let lastCell;
    for (let i = 0; i < arr.length; i++) {
        if ( counter === 0) {
            firstCell = arr[i]
        }

        if (arr[i].val === val) {
            counter++;
            if (counter === count) {
                lastCell = arr[i];
                printLine(
                    countCoordinate(firstCell.j),
                    countCoordinate(firstCell.i),
                    countCoordinate(lastCell.j),
                    countCoordinate(lastCell.i));
                return true
            }
        } else {
            counter = 0;
        }
    }
    return false ;
}
// calculate coordinate of line

function countCoordinate (val){
   return (val * side ) + (side / 2);
}
//create svg line and set them attributes
function printLine(x1, y1, x2, y2) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    let line= document.createElementNS('http://www.w3.org/2000/svg','line');
    let game=document.getElementById("game");

    svg.setAttribute("id","svg");
    svg.setAttribute("style", "width: " + width + "px; height: " + height + "px;");

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke","rgba(184,141,218,0.81)");
    line.setAttribute("stroke-width","10");
    line.setAttribute("id", "line");

    game.insertBefore(svg, game.firstChild);
    document.getElementById("svg").appendChild(line);
}

//print the result of game
function printWinner(){
    (step % 2 === 0) ? document.getElementById("winner").innerText = "0 win!":
        document.getElementById("winner").innerText = "X win!'";
}

function modal(){
    document.getElementById("myModal").setAttribute("style", "display: block");
}

class Cell {
    constructor(i, j, val) {
        this.i = i;
        this.j = j;
        this.val = val;
    }
}