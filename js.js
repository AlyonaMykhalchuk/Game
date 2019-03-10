window.onload = function tictuc () {
    startGame();
}


function startGame() {
    var game = document.getElementById("game");
    document.getElementById("clear").addEventListener("click", clearData);
    for (var i = 0; i < 9; i++) {
        game.innerHTML += '<div class= "block general"><div>';

    }

    var step = 0;
    game.onclick = function tuctuc(event) {
        console.log(event);
        var symbol = "0"
        if (event.target.className === "block general") {
            if (step % 2 === 0) {
                symbol = "X";
            }
            else {
                symbol = "0";
            }
            event.target.innerText = symbol;
            event.target.className = "closed general";

            step++;
            if (step > 3) {
                checkWinner();
            }
        }
    }

    function checkWinner() {
        var result = document.getElementById("result");
        var allBlock = document.getElementsByClassName("general");
        console.log(allBlock);
        if (allBlock[0].innerText == "X" && allBlock[1].innerText == "X" && allBlock[2].innerText == "X" ||
            allBlock[3].innerText == "X" && allBlock[4].innerText == "X" && allBlock[5].innerText == "X" ||
            allBlock[6].innerText == "X" && allBlock[7].innerText == "X" && allBlock[8].innerText == "X" ||
            allBlock[0].innerText == "X" && allBlock[4].innerText == "X" && allBlock[8].innerText == "X" ||
            allBlock[2].innerText == "X" && allBlock[4].innerText == "X" && allBlock[6].innerText == "X" ||
            allBlock[0].innerText == "X" && allBlock[3].innerText == "X" && allBlock[6].innerText == "X" ||
            allBlock[1].innerText == "X" && allBlock[4].innerText == "X" && allBlock[7].innerText == "X" ||
            allBlock[2].innerText == "X" && allBlock[5].innerText == "X" && allBlock[8].innerText == "X") {
            return result.innerText = "The winner is player 'X'";
        }
        //check 0
        if (allBlock[0].innerText == "0" && allBlock[1].innerText == "0" && allBlock[2].innerText == "0" ||
            allBlock[3].innerText == "0" && allBlock[4].innerText == "0" && allBlock[5].innerText == "0" ||
            allBlock[6].innerText == "0" && allBlock[7].innerText == "0" && allBlock[8].innerText == "0" ||
            allBlock[0].innerText == "0" && allBlock[4].innerText == "0" && allBlock[8].innerText == "0" ||
            allBlock[2].innerText == "0" && allBlock[4].innerText == "0" && allBlock[6].innerText == "0" ||
            allBlock[0].innerText == "0" && allBlock[3].innerText == "0" && allBlock[6].innerText == "0" ||
            allBlock[1].innerText == "0" && allBlock[4].innerText == "0" && allBlock[7].innerText == "0" ||
            allBlock[2].innerText == "0" && allBlock[5].innerText == "0" && allBlock[8].innerText == "0") {
            return result.innerText = "The winner is player '0'";
        }

        //no winner
        else {
            if (step === 8) {
                alert("no winner")
            }
        }
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