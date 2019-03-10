window.onload = function tictuc () {
    startGame();
}


function startGame() {
    var gameSize = 3;
    var side = 100;
    var x1;
    var y1;
    var x2;
    var y2;
    var gameField = [gameSize][gameSize];
    for (var i = 0; i < gameSize; i++) {
        for (var j = 0; j < gameSize; j++) {
            gameField[i][j] = "";
        }
    }
    var game = document.getElementById("game");

    document.getElementById("clear").addEventListener("click", clearData);


    var step = 0;
    game.onclick = function tuctuc(event) {
        console.log(event);
        var symbol = "0"
        if (event.target.className === "block") {
            if (step % 2 === 0) {
                symbol = "X";
            }
            else {
                symbol = "0";
            }
            event.target.innerText = symbol;
            event.target.className = "closed";

            step++;
            if (step > 3) {
                checkWinner();
            }
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
    for (var i = 0; i < gameSize; i++) {
        for (var j = 0; j < gameSize; j++) {
            var htmlElem = document.createElement("div");
            htmlElem.setAttribute("class", "block");
            htmlElem.setAttribute("id", i + ',' + j);
            htmlElem.setAttribute("onclick", )
            htmlElem.innerText = gameField = [i][j];
            game.innerHTML += htmlElem.value;
        }
    }
}

function changeElement(id) {

}

