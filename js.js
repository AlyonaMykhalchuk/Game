var gameSize = 3;
var side = 100;
var x1;
var y1;
var x2;
var y2;
var height = gameSize * side;
var width = gameSize * side;
var gameField = [gameSize];

window.onload = function () {
    startGame();
}


function startGame() {
    for (let i = 0; i < gameSize; i++) {
        let line = [gameSize];
        for (let j = 0; j < gameSize; j++) {
            line[j] = "";
        }
        gameField[i] = line;
    }
    var game = document.getElementById("game");

    printGame();

    document.getElementById("clear").addEventListener("click", clearData);


    var step = 0;
    game.onclick = function(event) {
        console.log(event);
       // var symbol = "0"
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
          //  event.target.innerText = symbol;
            event.target.className = "closed";

            step++;

            checkWinner();

            printGame();
        }
    }
}

function checkWinner() {
    if (checkHorizontal()) {
        return true;
    }
    if (checkVertical()) {
        return true;
    }
    if (checkDiagonal()) {
        return true;
    }
    return false;
}

function clearData() {
    document.getElementById("result").innerHTML = "";
    var allBlock = document.getElementsByClassName("closed");
    for (i = 0; i < allBlock.length; i++) {
        allBlock[i].innerHTML = "";
    }
    document.getElementById("game").innerHTML="";
    startGame();

}

function printGame() {
    var game = document.getElementById("game");
    let svg = document.getElementById("svg");
    game.innerHTML = "";
    if (svg) {
        game.appendChild(svg);
    }
    for (var i = 0; i < gameSize; i++) {
        for (var j = 0; j < gameSize; j++) {
            var htmlElem = document.createElement("div");

            htmlElem.setAttribute("id", i + ',' + j);
            htmlElem.innerText = gameField[i][j];
            if(gameField[i][j] == ""){
                htmlElem.setAttribute("class", "block")
            } else {
                htmlElem.setAttribute("class", "closed")
            }
            game.appendChild(htmlElem);
        }
    }
}

function checkHorizontal(){
    let value = false;
    for (let i = 0; i < gameSize; i++) {
        let line = gameField[i];
        if(isAllX(line) || isAllO(line)){
            let x1, x2, y1, y2;
            y1 = y2 = (i * side) + (side * 0.5);
            x1 = 0;
            x2 = width;
            printLine(x1,y1,x2,y2);
            value = true;
        }
    }
    return value;
}

function checkVertical(){

}

function checkDiagonal(){

}

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

function printLine(x1, y1, x2, y2) {
    var svg = document.createElement("svg");
    var line= document.createElement("line");

    svg.setAttribute("id","svg");
    svg.setAttribute("height",height);
    svg.setAttribute("width",width);
    line.setAttribute("x1", x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2",y2);
    line.setAttribute("stroke","blue");

    var game=document.getElementById("game");
    game.appendChild(svg);
    svg.appendChild(line);
    game.insertBefore(svg, game.firstChild);
}