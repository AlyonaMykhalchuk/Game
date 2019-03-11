//create variable size of game field
var gameSize = 3;
var side = 100;
var height = gameSize * side;
var width = gameSize * side;

var gameField = [gameSize];
//variable of line position
var x1;
var y1;
var x2;
var y2;


window.onload = function () {
    startGame();
}


function startGame() {
    clearData();//
    populateArrayWithValues();// fill the two-dimensional array with initial values
    printGame();// draw array
    var step = 0;
    game.onclick = function(event) {
        console.log(event);
        if (event.target.className === "block") {
            let id = event.target.getAttribute("id");
            let array = id.split(',');
            let i = array[0];
            let j = array[1];

            if (step % 2 === 0) {
                gameField[i][j] = "X";
            }
            else {
                gameField[i][j] = "0";
            }

            step++;
            checkWinner();
            // check standoff ,activate button,print message result
            if (step === gameSize * gameSize) {
                game.setAttribute("class", "disabled");
                document.getElementById("clear").setAttribute("class", "displayBlock");
                let winner= document.getElementById("winner");
                winner.innerText= "No winner!";

            }
            printGame();

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
    checkHorizontal();
    checkVertical();
    checkDiagonalFromLeftCorner();
    checkDiagonalFromRightCorner();


}

function clearData() {
    document.getElementById("clear").setAttribute("class", "displayNone");
    let game = document.getElementById("game");
    game.innerHTML = "";
    game.removeAttribute("class");
    game.setAttribute("style", "width: " + width + "px; " + "height: " + height + "px");
    document.getElementById("winner").innerText=""
}
//print array and update array's attributes and value
function printGame() {
    let game = document.getElementById("game");
    let svg = document.getElementById("svg");
    game.innerHTML = "";
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            let htmlElem = document.createElement("div");

            htmlElem.setAttribute("id", i + ',' + j);
            htmlElem.innerText = gameField[i][j];
            if(gameField[i][j] === ""){
                htmlElem.setAttribute("class", "block")
            } else {
                htmlElem.setAttribute("class", "closed")
            }
            game.appendChild(htmlElem);
        }
    }
    //check svg ,activate button,print message result
    if (svg) {
        game.insertBefore(svg, game.firstChild);
        game.setAttribute("class", "disabled");
        document.getElementById("clear").setAttribute("class", "displayBlock");
        printWinner()
    }
}
// check horizontal winner combination
function checkHorizontal(){
    for (let i = 0; i < gameSize; i++) {
        let line = gameField[i];
        if(isAllX(line) || isAllO(line)){
            let x1, x2, y1, y2;
            y1 = y2 = (i * side) + (side * 0.5);
            x1 = 0;
            x2 = width;
            printLine(x1,y1,x2,y2);
            printWinner()
        }
    }
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
            y1 = 0;
            y2 = height;
            printLine(x1, y1, x2, y2);
            printWinner()

        }
    }
}
// check left diagonal winner combination
function checkDiagonalFromLeftCorner(){
    let array = [gameSize];
    for (let i = 0; i < gameSize; i++) {
        array[i] = gameField[i][i];
    }
    if (isAllX(array) || isAllO(array)) {
        let x1, x2, y1, y2;
        x1 = 0;
        y1 = 0;
        x2 = width;
        y2 = height;
        printLine(x1, y1, x2, y2);
        printWinner()
    }
}
// check right diagonal winner combination
function checkDiagonalFromRightCorner(){
    let array = [gameSize];
    for (let i = 0; i < gameSize; i++) {
        array[i] = gameField[i][gameSize - 1 - i];
    }
    if (isAllX(array) || isAllO(array)) {
        let x1, x2, y1, y2;
        x1 = width;
        y1 = 0;
        x2 = 0;
        y2 = height;
        printLine(x1, y1, x2, y2);
        printWinner()
    }
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
    line.setAttribute("stroke","blue");
    line.setAttribute("id", "line");

    game.insertBefore(svg, game.firstChild);
    document.getElementById("svg").appendChild(line);
}
//print the result of game
function printWinner(){
    let winner= document.getElementById("winner");
    winner.innerText= "You win!";
}
