var squares = document.querySelectorAll(".square");
var xScore = document.querySelector("#xScore");
var oScore = document.querySelector("#oScore");
var draws = document.querySelector("#draws");
var turn = document.querySelector("#turn");

//store the current "state" of the game
//0=empty, 1=X, 2=O
var board = [0,0,0,0,0,0,0,0,0];
var active = 1;
var xWins = 0;
var oWins = 0;
var numDraws = 0;

for(var i=0; i<9; i++){
    squares[i].addEventListener("click", function(i){
        return function(){updateBoard(i)}
    }(i));
}

function updateBoard(location){
    //check to see if already full
    if(board[location]>0){
        alert("Choose an empty square, please.");
    }
    else{
        //Add an X or O depending on active player
        if(active===1){
            var x = document.createElement("img");
            x.src = "X.png";
            squares[location].appendChild(x);
            squares[location].style.paddingTop = "0px";
            //just for our model
            board[location]=1;
            active=2;
            turn.src = "O.png";
            checkForWin(1);
        }
        else if(active===2){
            var o = document.createElement("img");
            o.src = "O.png";
            squares[location].appendChild(o);
            squares[location].style.paddingTop = "0px";
            board[location]=2;
            active=1;
            turn.src = "X.png";
            checkForWin(2);
        }
    }
}

function checkForWin(player){
    //HW 1: How to check if someone has won the game? (Hint: use the board array!)
    
    //test---passed
    //alert("Checking to see if Player " + player + " won");
     
    //horizontal
    for(var i=0; i<7; i+=3){
        if(board[i]===player & board[i+1]===player & board[i+2]===player)
            endOfGame(player);
    }
    
    //vertical
    for(var i=0; i<3; i++){
        if(board[i]===player & board[i+3]===player & board[i+6]===player)
            endOfGame(player);
    }
    
    //diagonal
    if(board[0]===player & board[4]===player & board[8]===player)
            endOfGame(player);
    if(board[2]===player & board[4]===player & board[6]===player)
            endOfGame(player);
        
    //check for draw
    var draw = true;
    for(var i=0; i<9; i++)
        if(board[i]===0)
            draw=false;
    
    if(draw)
        endOfGame(3);  
}

function endOfGame(winner){
    //update scoreboard
    if(winner===1){
        var temp = xScore.textContent;
        var tempNum = parseInt(temp,10);
        tempNum++;
        xScore.textContent=tempNum;
    }
    else if(winner===2){
        var temp = oScore.textContent;
        var tempNum = parseInt(temp,10);
        tempNum++;
        oScore.textContent=tempNum;
    }
    else if(winner===3){
        var temp = draws.textContent;
        var tempNum = parseInt(temp,10);
        tempNum++;
        draws.textContent=tempNum;
    }

    //start a new game
    for(var i=0; i<9; i++)
        board[i]=0;
    
    for(var location=0; location<9; location++){
        if(squares[location].lastElementChild !== null){
            squares[location].removeChild(squares[location].lastElementChild);
            squares[location].style.paddingTop = "33.3%";
        }
    }
        
}