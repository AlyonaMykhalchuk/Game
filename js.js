var gameSize = 3;
var side = 100;
var x1;
var y1;
var x2;
var y2;
var gameField = [gameSize];

window.onload = function tictuc () {
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
    game.onclick = function tuctuc(event) {
        console.log(event);
        var symbol = "0"
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
            event.target.innerText = symbol;
            event.target.className = "closed";

            step++;

            checkWinner();

            printGame();
        }
    }

    function checkWinner() {
        var result = document.getElementById("result");

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
}
function line(){

}

function printGame() {
    var game = document.getElementById("game");
    game.innerHTML = "";
    for (var i = 0; i < gameSize; i++) {
        for (var j = 0; j < gameSize; j++) {
            var htmlElem = document.createElement("div");
            htmlElem.setAttribute("class", "block");
            htmlElem.setAttribute("id", i + ',' + j);
            htmlElem.innerText = gameField[i][j];
            console.log(htmlElem);
            game.appendChild(htmlElem);
        }
    }
}

