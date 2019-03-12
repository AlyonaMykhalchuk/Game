let gameSize;
let side = 100;
let height;
let width;
let gameField;
let x1;
let y1;
let x2;
let y2;
let step;


window.onload = function () {
    document.getElementById("myModal").setAttribute("style", "display: block");
};

function startGame() {
    gameSize = document.getElementById("gameSize").value;
    height = gameSize * side;
    width = gameSize * side;
    gameField = [gameSize];
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    clearData();
    populateArrayWithValues();// fill the two-dimensional array with initial values
    printGame();// draw array
    step = 0;
    game.onclick = function(event) {
        if (event.target.className === "block") {
            let id = event.target.getAttribute("id");
            let array = id.split(',');
            let i = array[0];
            let j = array[1];

            (step % 2 === 0) ? gameField[i][j] = "X": gameField[i][j] = "0";
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
            cell.innerText = gameField[i][j];
        }
    }
}

// fill the two-dimensional array with initial values
function populateArrayWithValues() {
    for (let i = 0; i < gameSize; i++) {
        let line = [gameSize];
        for (let j = 0; j < gameSize; j++) {
            line[j] = "";
        }
        gameField[i] = line;
    }
}

//check winner combination
function checkWinner() {
    if (checkHorizontal()) return true;
    if (checkVertical()) return true;
    if (checkDiagonalFromLeftCorner()) return true;
    if (checkDiagonalFromRightCorner()) return true;
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
        if(isAllX(line) || isAllO(line)){
            let x1, x2, y1, y2;
            y1 = y2 = (i * side) + (side * 0.5);
            x1 = 10;
            x2 = width-10;
            printLine(x1,y1,x2,y2);
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
        if (isAllX(array) || isAllO(array)) {
            let x1, x2, y1, y2;
            x1 = x2 = (i * side) + (side * 0.5);
            y1 = 10;
            y2 = height-10;
            printLine(x1, y1, x2, y2);
            printWinner();
            return true;
        }
    }
    return false;
}

// check left diagonal winner combination
function checkDiagonalFromLeftCorner(){
    let array = [gameSize];
    for (let i = 0; i < gameSize; i++) {
        array[i] = gameField[i][i];
    }
    if (isAllX(array) || isAllO(array)) {
        let x1, x2, y1, y2;
        x1 = 10;
        y1 = 10;
        x2 = width-10;
        y2 = height -10;
        printLine(x1, y1, x2, y2);
        printWinner();
        return true;
    }
    return false;
}

// check right diagonal winner combination
function checkDiagonalFromRightCorner(){
    let array = [gameSize];
    for (let i = 0; i < gameSize; i++) {
        array[i] = gameField[i][gameSize - 1 - i];
    }
    if (isAllX(array) || isAllO(array)) {
        let x1, x2, y1, y2;
        x1 = width-10;
        y1 = 10;
        x2 = 10;
        y2 = height-10;
        printLine(x1, y1, x2, y2);
        printWinner();
        return true;
    }
    return false;
}

//check all value X or 0 in array, return boolean
function isAllX(arr){
    let value = true;

    for (let i = 0; i < arr.length; i++) {
        if( arr[i] !== "X"){
         value=false;}
    }
    return value;
}

function isAllO(arr){
    let value = true;
        for (let i = 0; i < arr.length; i++) {
        if( arr[i] !== "0"){
            value=false;}
         }
    return value;
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
    line.setAttribute("stroke","deeppink");
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

